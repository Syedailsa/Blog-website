'use client'

// import { useState } from "react";

// export default function CommentsSection({ comments, postId }: { comments: any[]; postId: string }) {
//     const [email, setEmail] = useState("");
//     const [comment, setComment] = useState("");
//     const [submitted, setSubmitted] = useState(false);
  
//     const handleSubmit = async (e: React.FormEvent) => {
//       e.preventDefault();
  
//       const response = await fetch("/api/comments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, comment, postId }),
//       });
  
//       if (response.ok) {
//         setSubmitted(true);
//         setEmail("");
//         setComment("");
//       } else {
//         console.error("Failed to submit comment");
//       }
//     };
  
//     return (
//       <section className="mt-8">
//         <h3 className="text-lg font-bold">Comments</h3>
  
//         {/* Render Comments */}
//         {comments && comments.length > 0 ? (
//           <ul className="mt-4 space-y-4">
//             {comments.map((comment, index) => (
//               <li key={index} className="border-b pb-4">
//                 <p className="text-sm font-semibold">{comment.email}</p>
//                 <p className="text-sm">{comment.comment}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="mt-4 text-sm text-gray-500">No comments yet. Be the first to comment!</p>
//         )}
  
//         {/* Comment Form */}
//         <h3 className="text-lg font-bold mt-8">Leave a Comment</h3>
//         {submitted ? (
//           <p className="text-green-500">Thank you for your comment!</p>
//         ) : (
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
//             <input
//               type="email"
//               placeholder="Your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="border rounded p-2"
//             />
//             <textarea
//               placeholder="Your Comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               required
//               className="border rounded p-2"
//             ></textarea>
//             <button type="submit" className="bg-accentDarkPrimary text-white px-4 py-2 rounded">
//               Submit
//             </button>
//           </form>
//         )}
//       </section>
//     );
//   }


import { useForm } from "react-hook-form";

interface Props {
  postId: string;
}
interface IData {
  name: string;
  email: string;
  comment: string;
}

const AddComment = ({ postId }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IData>();

  const onSubmit = async (data: IData) => {
    const { name, email, comment } = data;

    const res = await fetch("/api", {
      method: "POST",
      body: JSON.stringify({ name, email, comment, postId }),
    });
    if (!res.ok) {
      console.log("Failed to add comment");
      return;
    }

    reset();
  };

  return (
    <div className="mt-14">
      <p className="mb-3">
        Leave a comment <span role="img">💬</span>
      </p>
      <form
        className="flex flex-col border dark:border-purple-950 shadow-sm rounded px-8 pt-6 pb-6 mb-10"
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <label>Name</label>
        <input
          {...register("name", { required: true })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.name && (
          <p className="text-red-600 text-xs">Name is required.</p>
        )}
        <label>
          Email{" "}
          <span className="text-xs">(Your email will not be published!)</span>
        </label>
        <input
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.email && (
          <p className="text-red-600 text-xs">
            Please enter a valid email address.
          </p>
        )}
        <label>Comment</label>
        <textarea
          {...register("comment", { required: true, minLength: 2 })}
          className="mb-4 py-1 bg-amber-100 dark:bg-slate-900"
        />
        {errors.comment && (
          <p className="text-red-600 text-xs">Minimum 2 characters.</p>
        )}
        <input
          className={`cursor-pointer bg-purple-500 text-white rounded py-2 hover:bg-purple-600 ${
            isSubmitting ? "opacity-50" : ""
          }`}
          disabled={isSubmitting}
          value={isSubmitting ? "Submitting..." : "Submit"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddComment;






  