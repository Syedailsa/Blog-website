import React from "react";

interface Comment{
    _id: string,
    name: string,
    _createdAt: string,
    comment: string
}

interface Props {
  comments: Array<Comment>;
  slug: string;
}

const AllComments = ({comments}: Props) => {
  return (
    <div>
      <h3 className="text-accentDarkPrimary font-semibold">All Comments</h3>
      {comments?.length === 0 && <p>No comments yet.</p>}
      {comments?.map((comment) => (
        <div key={comment?._id} className="border-b border-gray-200/50 py-3">
          <p>
            <strong>{comment?.name}</strong>{" "}
            <span className="text-gray-500 text-sm">
              {new Date(comment?._createdAt).toLocaleString()}
            </span>
          </p>
          <p>{comment?.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default AllComments;