// models/adminLog.model.js
import { Schema, model, models } from 'mongoose';

const adminLogSchema = new Schema(
  {
    adminId: {
         type: Schema.Types.ObjectId, 
         ref: 'User', required: false 
        }, 
    ipAddress: { 
        type: String, 
        required: true 
    },
    deviceIp: { 
        type: String, 
        required: false 
    }, // فرض می‌کنیم deviceIp هم وجود دارد
    adminAgent: { 
        type: String, 
        required: true 
    },
    referrer: { 
        type: String, 
        default: 'direct' 
    },
    pageUrl: { 
        type: String, 
        required: true 
    },
    deviceType: { 
        type: String, 
        required: true 
    },
    geoLocation: {
      country: { 
        type: String 
    },
      region: { 
        type: String 
    },
      city: { 
        type: String 
    },
      lat: { 
        type: Number 
    },
      lon: { 
        type: Number 
    },
    },
    isFromSpecialCountry: { 
        type: Boolean, 
        default: false 
    }, // فیلد جدید
    interaction: { 
        type: Schema.Types.Mixed 
    }, // برای ذخیره تعاملات مانند کلیک‌ها
    timestamp: { 
        type: Date, default: Date.now 
    },
  },
  { timestamps: true }
);

// ایجاد ایندکس‌های منحصربه‌فرد
adminLogSchema.index({ adminId: 1, pageUrl: 1, timestamp: 1 });
adminLogSchema.index({ ipAddress: 1, pageUrl: 1, timestamp: 1 });
adminLogSchema.index({ deviceIp: 1, pageUrl: 1, timestamp: 1 });

const UserLog = models.UserLog || model('UserLog', adminLogSchema);

export default UserLog;
