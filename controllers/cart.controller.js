  

import Cart from "@/models/cart.model";
import User from "@/models/admin.model";

// add to cart
export async function addToCart(req) {
  try {
    const cart = await Cart.findOne({ admin: req.admin._id });
    let result = {};

    if (cart) {
      result = await Cart.findOneAndUpdate(
        { admin: req.admin._id },
        {
          $push: { rents: req.body.rent },
        }
      );
    } else {
      result = await Cart.create({
        admin: req.admin._id,
        rents: [req.body.rent],
      });

      await User.findByIdAndUpdate(req.admin._id, {
        $set: {
          cart: result._id,
        },
      });
    }

    if (result) {
      return {
        success: true,
        message: "Successfully added to cart",
      };
    } else {
      return {
        success: false,
        message: "Failed to add to cart",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get cart
export async function getCart() {
  try {
    const cart = await Cart.find().populate([
      "admin",
      {
        path: "rents",
        populate: ["owner"],
      },
    ]);

    if (cart) {
      return {
        success: true,
        message: "Successfully fetch cart",
        data: cart,
      };
    } else {
      return {
        success: false,
        message: "Failed to fetch cart",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// delete from cart
export async function removeFromCart(req) {
  try {
    const admin = await User.findById(req.admin._id);

    const result = await Cart.findByIdAndUpdate(admin.cart, {
      $pull: {
        rents: req.query.id,
      },
    });

    if (result) {
      return {
        success: true,
        message: "Successfully deleted from cart",
      };
    } else {
      return {
        success: false,
        message: "Failed to delete from cart",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
