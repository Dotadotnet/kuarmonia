import User from "@/models/user.model";
import generateAccessToken from "@/utils/jwt.util";
import Verify from "@/models/verify.model";
import sendSms from "@/utils/smsService";

export async function signInPhone(req) {
  try {
    const { phone } = req.body;
    if (!phone) {
      return {
        success: false,
        message: "شماره موبایل الزامی است."
      };
    }

    let user = await User.findOne({ phone });

    try {
      if (!user) {
        user = await User.create({
          phone,
          phoneVerified: false,
          userLevel: "basic"
        });
      }
    } catch (error) {
      console.error("Error occurred while creating user:", error);
      return {
        success: false,
        message: "خطا در ایجاد کاربر، لطفاً مجدداً تلاش کنید"
      };
    }

    const code = Math.floor(1000 + Math.random() * 9000);

    await Verify.create({
      user: user._id,
      code,
      phone
    });

    const message = `شرکت مهاجرتی کارمونیا\ncode: ${code}\nکد ورود شما به وبسایت: ${code}\nلغو 11`;

    const smsSent = await sendSms(phone, message);

    if (smsSent) {
      return {
        success: true,
        message: "کد چهار رقمی به موبایل شما ارسال شد",
        phone: phone
      };
    } else {
      return {
        success: false,
        message: "ارسال پیامک ناموفق بود."
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function addName(req) {
  try {
    let { phone, name } = req.body;
    if (!phone || !name) {
      return {
        message: "شماره موبایل و  نام الزامی است.",
        success: false
      };
    }

    const user = await User.findOneAndUpdate(
      { phone },
      { name, userLevel: "verified" },
      { new: true }
    );
    console.log(user);
    if (!user) {
      return {
        message: "کاربر یافت نشد.",
        success: false
      };
    }

    const accessToken = generateAccessToken({
      _id: user._id,
      phone: user.phone,
      name: user.name
    });
    return {
      success: true,
      message: "تبریک! ثبت نام شما تکمیل شد",
      accessToken
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function verify(req) {
  try {
    let { phone, code } = req.body;
    if (!phone || !code) {
      return {
        message: "شماره موبایل و کد تایید الزامی است.",
        success: false
      };
    }
    const user = await User.findOne({ phone });
    const verification = await Verify.findOne({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!verification) {
      return {
        message: "کد وارد شده صحیح نیست.",
        success: false
      };
    }

    if (verification.code !== code) {
      return {
        message: "کد تایید وارد شده صحیح نمی‌باشد.",
        success: false
      };
    }

    if (!user.phoneVerified) {
      user.phoneVerified = true;
      await user.save();

      return {
        success: true,
        message: "تبریک!شماره تلفن شما تایید شد",
        isSignUp: true
      };
    } else {
      const accessToken = generateAccessToken({
        _id: user._id,
        phone: user.phone,
        name: user.name,
        id: user._id
      });
      return {
        success: true,
        message: "تبریک!ورود شما موفقیت آمیز بود",
        accessToken
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function persistUser(req) {
  try {
    console.log("req.user", req.user);
    const user = await User.findById(req.user._id);
    console.log(user);
    if (user) {
      return {
        success: true,
        message: "اطلاعات کاربر با موفقیت دریافتش د",
        data: user
      };
    } else {
      return {
        success: false,
        message: "خطا در دریافت اطلاعات کاربر"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}

export async function signInGoogle(req) {
  try {
    const { email, name, image ,googleId } = req.body;
    console.log(req.body)
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email: email,
        name: name,
        "avatar.url": image,
        emailVerified: true,
        userLevel: "verified",
        googleId
      });
      await user.save();
    }
    const accessTokenGenerated = generateAccessToken({
      _id: user._id,
      email: user.email,
      name: user.name
    });
    return {
      success: true,
      message: "تبریک! ورود شما از طریق حساب گوگل انجام شد.",
      accessToken: accessTokenGenerated
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
