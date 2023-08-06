// const blogModel = require("../models/blogModel");
// const userModel = require("../models/userModel");
// const mongoose = require("mongoose");

// // get all blog
// exports.getAllBlogController = async (req, res) => {
//   try {
//     const blog = await blogModel.find({});
//     if (!blog) {
//       return res.status(200).send({
//         success: false,
//         message: "No Blog Found",
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       BlogCount: blog.length,
//       message: "All blog listed",
//       blog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error while find blog",
//       error,
//     });
//   }
// };

// //create
// exports.createBlogController = async (req, res) => {
//   try {
//     const { title, description, image, user } = req.body;
//     // validation
//     if (!title || !description || !image || !user) {
//       return res.status(400).send({
//         success: false,
//         message: "please provide all field",
//       });
//     }
//     const exisitingUser = await userModel.findById(user);
//     // validation
//     if (!exisitingUser) {
//       return res.status(404).send({
//         success: false,
//         message: "unable to find user",
//       });
//     }
//     const newBlog = new blogModel({ title, description, user });
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await newBlog.save({ session });
//     exisitingUser.blog.push(newBlog);
//     await exisitingUser.save({ session });
//     await session.commitTransaction();
//     await newBlog.save();
//     return res.status(201).send({
//       success: true,
//       message: "Blog Created",
//       newBlog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "error while creating blog",
//       error,
//     });
//   }
// };

// // update
// exports.updateBlogController = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { title, description, image } = req.body;
//     const blog = await blogModel.findByIdAndUpdate(
//       { _id: id },
//       { ...req.body },
//       { new: true }
//     );
//     return res.status(200).send({
//       success: true,
//       message: "blog updated",
//       blog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "Error while updating blog",
//       error,
//     });
//   }
// };

// // get single blog
// exports.getBlogByIdController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await blogModel.findById(id);
//     if (!blog) {
//       return res.status(400).send({
//         success: false,
//         message: "blog not found by this is",
//       });
//     }
//     return res.status(200).send({
//       success: true,
//       message: "fetch blog by id",
//       blog,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "error in fetching blog by id",
//       error,
//     });
//   }
// };

// // delete blog
// exports.deleteBlogController = async (req, res) => {
//   try {
//     const b = await blogModel.findById(req.params.id).populate("user");
//     const id = b.user.id;
//     console.log(id);
//     // console.log(b);
//     // await b.user.blog.pull(b);
//     // b.remove();
//     // b.save();
//     // await b.user.save();

//     return res.status(200).send({
//       success: true,
//       message: "Blog deleted!",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: "error in deleteing blog",
//       error,
//     });
//   }
// };
const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found",
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error WHile Getting Blogs",
      error,
    });
  }
};

//Create Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await userModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blog.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error,
    });
  }
};

//Update Blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Updating Blog",
      error,
    });
  }
};

//SIngle Blog
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "blog not found with this is",
      });
    }
    return res.status(200).send({
      success: true,
      message: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error while getting single blog",
      error,
    });
  }
};

//Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blogs = await blogModel
      // .findOneAndDelete(req.params.id)
      .findByIdAndDelete(req.params.id)
      .populate("user");
    await blogs.user.blog.pull(blogs);
    await blogs.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog Deleted!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Erorr WHile Deleteing BLog",
      error,
    });
  }
};

//GET USER BLOG
exports.userBlogControlller = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blog");

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user blog",
      error,
    });
  }
};
