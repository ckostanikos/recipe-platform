import {
  getCommentsByRecipe,
  addCommentToRecipe,
} from "../models/comment.model.js";

export async function getRecipeComments(req, res) {
  const recipeId = req.params.id;
  try {
    const comments = await getCommentsByRecipe(recipeId);
    res.json({ success: true, comments });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch comments." });
  }
}

export async function postRecipeComment(req, res) {
  const recipeId = req.params.id;
  const userId = req.session.userId;
  const { comment } = req.body;
  if (!comment || !userId) {
    return res
      .status(400)
      .json({ success: false, error: "Comment text required." });
  }
  try {
    await addCommentToRecipe(recipeId, userId, comment);
    res.json({ success: true, message: "Comment posted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to post comment." });
  }
}
