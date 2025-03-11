import Admin from "@/models/admin.model";
import generateAccessToken from "@/utils/jwt.util";
export async function signUp(req) {
  try {
    const { email, phone ,avatarUrl } = req.body;
    const existingAdmin = await Admin.findOne({
      $or: [{ email: email }, { phone: phone }]
    });

    if (existingAdmin) {
      return {
        success: false,
        message: "کاربری با این ایمیل یا شماره تلفن قبلاً ثبت‌نام کرده ",
        redirectToLogin: true
      };
    }

    let avatar = null;
    if (req.uploadedFiles["avatar"]?.length) {
      avatar = {
        url: req.uploadedFiles["avatar"][0].url,
        public_id: req.uploadedFiles["avatar"][0].key
      };
    }else{
      if (!avatarUrl) {
        return {
          success: false,
          message: "لطفاً تصویر آواتار را وارد کنید یا یک URL معتبر ارسال کنید."
        };
      }
      avatar = {
        url: avatarUrl,
      };
    }

    const adminCount = await Admin.countDocuments();
    const role = adminCount === 0 ? "superAdmin" : "operator";
    const status = adminCount === 0 ? "active" : "inactive";

    const admin = await Admin.create({
      ...req.body,
      role: role,
      status: status,
      adminLevel:"basic",
      avatar
    });


    if (admin) {
      return {
        success: true,
        message: "ثبت نام شما با موفقیت انجام شد. خوش آمدید!"
      };
    } else {
      return {
        success: false,
        message: "متاسفانه ثبت نام شما با شکست مواجه شد"
      };
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "خطا در سرور. لطفاً بعداً دوباره تلاش کنید."
    };
  }
}

export async function signIn(req) {
  try {
    const admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      if (await admin.comparePassword(req.body.password, admin.password)) {
        if (admin.status === "active") {
          const accessToken = generateAccessToken(admin);

          return {
            success: true,
            message: "تبریک!شما با موفقیت ورود کردید",
            accessToken
          };
        } else {
          return {
            success: false,
            message: "حساب کاربری شما غیر فعال است"
          };
        }
      } else {
        return {
          success: false,
          message: "پسورد صحیح نیست"
        };
      }
    } else {
      return {
        success: false,
        message: "کاربر یافت نشد"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}



// get persist admin
export async function persistAdmin(req) {
  try {
    const admin = await Admin.findById(req.admin._id)
    .select(" name avatar email phone role status adminLevel ")
    if (admin) {
      return {
        success: true,
        message: "اطلاعات مدیر با موفقیت دریافت شد",
        data: admin
      };
    } else {
      return {
        success: false,
        message: "خطا در دریاقت اطلاعات مدیر"
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
}
