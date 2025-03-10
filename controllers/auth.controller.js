import User from "@/models/user.model";
import JWT from "@/utils/jwt.util";
import MelipayamakApi from "melipayamak";
import path from "path";
import Verify from "@/models/verify.model";
import Sms from "@/utils/Sms";
export async function signUpAdmin(req) {
  try {
    const { email, phone } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email: email }, { phone: phone }],
    });
    if (existingUser) {
      return {
        success: false,
        message: "کاربری با این ایمیل یا شماره تلفن قبلاً ثبت‌نام کرده است. لطفاً به صفحه ورود بروید.",
        redirectToLogin: true,
      };
    }
    let avatar = null;

    if (req.uploadedFiles["avatar"]?.length) {
      avatar = {
        url: req.uploadedFiles["avatar"][0].url,
        public_id: req.uploadedFiles["avatar"][0].key
      };
    }
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "superAdmin" : "user";
    const status = userCount === 0 ? "active" : "inactive";





    const user = await User.create({
      ...req.body,
      role: role,
      status: status,
      avatar,
    });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    const result = await user.save({ validateBeforeSave: true });

    if (result) {
      return {
        success: true,
        message: "ثبت نام شما با موفقیت انجام شد",
      };
    } else {
      return {
        success: false,
        message: "ثبت نام شما با شکست مواجه شد",
      };
    }
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      let message = "مشکلی در ثبت نام وجود دارد.";
      if (field === "email") {
        message = "ایمیل وارد شده قبلاً ثبت شده است. لطفاً از ایمیل دیگری استفاده کنید یا به صفحه ورود بروید.";
      } else if (field === "phone") {
        message = "شماره تلفن وارد شده قبلاً ثبت شده است. لطفاً از شماره دیگری استفاده کنید یا به صفحه ورود بروید.";
      }
      return {
        success: false,
        message: message,
      };
    }
    return {
      success: false,
      message: `خطا: ${error.message}`,
    };
  }
}



// signin
export async function signInAdmin(req) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.role == 'User') {
        return {
          success: false,
          message: "از لاگین کاربر وارد شوید",
        };
      }
      if (await user.comparePassword(req.body.password, user.password)) {
        if (user.status === "active") {
          const jwt = new JWT()
          const accessToken = jwt.generateAccessToken(user);
          return {
            success: true,
            message: "ورود با موفقیت انجام شد",
            accessToken,
          };
        } else {
          return {
            success: false,
            message: "حساب کاربری شما غیرفعال است",
          };
        }
      } else {
        return {
          success: false,
          message: "رمز عبور اشتباه است",
        };
      }
    } else {
      return {
        success: false,
        message: "کاربری با این ایمیل یافت نشد",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `خطا: ${error.message}`,
    };
  }
}

export async function signUpUser(req) {
  const { phone, name, verify } = req.body;
  const existingUser = await User.findOne({ phone: req.body.phone });
  if (existingUser) {
    return {
      success: false,
      message: "حتما مشکلی پیش اومده",
    };
  } else {
    const verify_code = await Verify.findOne({ phone: phone });
    if (verify_code && verify == verify_code.code) {
      const user = await User.create({
        phone: req.body.phone,
        name: req.body.name,
        email: phone + '@gmail.com',
        password: '.',
      });
      const jwt = new JWT()
      const accessToken = jwt.generateAccessToken(user);
      await Verify.findByIdAndDelete(verify_code.id)
      if (!(Math.floor(Date.now() / 1000) - verify_code.time < 120)) {
        await Verify.findByIdAndDelete(verify_code.id)
      } 
      return {
        success: true,
        message: "ثبت نام با موفقیت انجام شد",
        accessToken,
      };
      
    } else {
      return {
        success: false,
        message: "کد شتباه است",
      };
    }
  }


}

export async function getTimer(req) {
  const { phone } = req.body;
  const verify = await Verify.findOne({ phone: phone });
  if (verify && (Math.floor(Date.now() / 1000) - verify.time < 120)) {
    return {
      success: true,
      message: (Math.floor(120 - (Math.floor(Date.now() / 1000) - verify.time))),
    };
  } else {
    await Verify.findByIdAndDelete(verify.id)
    return {
      success: false,
      message: "حتما خطایی رخ داده",
    };
  }


}

export async function signIn(req) {
  const { phone, name, verify } = req.body;
  const existingUser = await User.findOne({ phone: req.body.phone });
  if (existingUser) {
    const verify_code = await Verify.findOne({ phone: phone });
    if (verify_code && verify == verify_code.code) {
      if (Math.floor(Date.now() / 1000) - verify_code.time < 120) {
        const jwt = new JWT()
        const accessToken = jwt.generateAccessToken(existingUser);
        return {
          success: true,
          message: "خوش آمدید",
          accessToken,
        };
      } else {
        await Verify.findByIdAndDelete(verify_code.id)
        return {
          success: false,
          message: "کد منقضی شده است",
        };
      }
    } else {
      return {
        success: false,
        message: "کد شتباه است",
      };
    }
  } else {
    const verify_code = await Verify.findOne({ phone: phone });
    if (verify_code && verify == verify_code.code) {
      if (Math.floor(Date.now() / 1000) - verify_code.time < 120) {
        return {
          success: true,
          message: "کد وارد شده صحیح است",
        };
      } else {
        await Verify.findByIdAndDelete(verify_code.id)
        return {
          success: false,
          message: "کد منقضی شده است",
        };
      }
    } else {
      return {
        success: false,
        message: "کد شتباه است",
      };
    }
  }

}

export async function sendVerifyLogin(req) {
  const { phone } = req.body;
  const existingUser = await User.findOne({ phone: phone });
  const random_code = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
  if (!existingUser) {
    return {
      success: false,
      message: "این شماره قبلا ثبت نشده است لطفا ثبت نام کنید",
    };
  } else {
    if ((await existingUser.comparePassword('.', existingUser.password))) {
      const verify = await Verify.findOne({ phone: phone });
      if (!verify || (Math.floor(Date.now() / 1000) - verify.time > 120)) {
        const sms = new Sms(phone);
        sms.verifyCode([random_code]);
        if (verify) {
          await Verify.findByIdAndDelete(verify.id)
        }
        await Verify.create({
          phone: phone,
          code: random_code,
          time: Math.floor(Date.now() / 1000),
        });
        return {
          success: true,
          message: "کد ارسال شد",
        };
      } else {
        return {
          success: true,
          message: "کد تایید قبلا برای شما راسال شده و برای درخواست مجدد کد باید" + ' ' + (Math.floor(120 - (Math.floor(Date.now() / 1000) - verify.time))) + ' ' + "ثانیه دیگه امتحان کنید",
        };
      }
    } else {
      return {
        success: false,
        message: 'از طریق لاگین ادمین اقدام کنید',
      };
    }
  }
}

export async function sendVerify(req) {
  const { phone } = req.body;
  const random_code = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
  const verify = await Verify.findOne({ phone: phone });
  if (!verify || (Math.floor(Date.now() / 1000) - verify.time > 120)) {
    const sms = new Sms(phone);
    sms.verifyCode([random_code]);
    if (verify) {
      await Verify.findByIdAndDelete(verify.id)
    }
    await Verify.create({
      phone: phone,
      code: random_code,
      time: Math.floor(Date.now() / 1000),
    });
    return {
      success: true,
      message: "کد ارسال شد",
    };
  } else {
    return {
      success: true,
      message: "کد تایید قبلا برای شما راسال شده و برای درخواست مجدد کد باید" + ' ' + (Math.floor(120 - (Math.floor(Date.now() / 1000) - verify.time))) + ' ' + "ثانیه دیگه امتحان کنید",
    };
  }

}

// forgot password
export async function forgotPassword(req) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const hashedPassword = user.encryptPassword(req.body.password);

      const result = await User.findByIdAndUpdate(user._id, {
        $set: { password: hashedPassword },
      });

      if (result) {
        return {
          success: true,
          message: "Password reset successfully",
        };
      } else {
        return {
          success: false,
          message: "Password reset failed",
        };
      }
    } else {
      return {
        success: false,
        message: "User not found",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get persist user
export async function persistUser(req) {
  try {
    const user = await User.findById(req.user._id).populate([
      {
        path: "favorite",
        populate: [
          "user",
          {
            path: "rents",
            populate: ["owner"],
          },
        ],
      },
      {
        path: "cart",
        populate: [
          "user",
          {
            path: "rents",
            populate: ["owner"],
          },
        ],
      },
      {
        path: "reviews",
        populate: ["reviewer", "rent"],
      },
      {
        path: "purchases",
        populate: [
          "user",
          {
            path: "rent",
            populate: [
              {
                path: "users",
                populate: [
                  {
                    path: "purchases",
                    populate: ["user", "rent"],
                  },
                ],
              },
              "owner",
              "reviews",
            ],
          },
        ],
      },
      {
        path: "rents",
        populate: [
          {
            path: "users",
            populate: [
              {
                path: "purchases",
                populate: ["user", "rent"],
              },
            ],
          },
          ,
          "owner",
          "reviews",
        ],
      },
    ]);

    if (user) {
      return {
        success: true,
        message: "Successfully fetch user information",
        data: user,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch user information",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
