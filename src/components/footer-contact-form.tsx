// import React from "react";

// export default function FooterContactForm() {
//   return (
//     <form className="bg-accentDarkSecondary px-6 sm:px-8 lg:px-12 py-6 w-full md:w-1/2 ">
//       <div className="w-full">
//         <h2 className="text-3xl font-bold mb-5 text-dark text-center uppercase">
//           reach us
//         </h2>
//         <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Name"
//             name="name"
//             className="w-full px-3 py-2  text-dark placeholder-gray-400 bg-light border rounded"
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             required
//             name="email"
//             className="w-full px-3 py-2  text-dark placeholder-gray-400 bg-light border rounded"
//           />
//         </div>

//         <textarea
//           rows={3}
//           placeholder="Message"
//           name="message"
//           className="mb-4 w-full px-3 py-2  text-dark placeholder-gray-400 bg-light border rounded"
//         />

//         <button className="px-12 py-3 text-xl font-semibold border-2 border-dark  text-light hover:text-dark uppercase transition-all duration-150 ease-linear bg-dark hover:bg-light rounded-lg block mx-auto">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// }
'use client'

import React, { useState } from "react";

export default function FooterContactForm() {
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  // Handle form submission status
  interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
    email: HTMLInputElement;
    message: HTMLTextAreaElement;
  }

  interface FormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  const handleSubmit = async (event: React.FormEvent<FormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setStatus("success");
    } else {
      setStatus("error");
    }

    // Reset form after submission
    form.reset();
  };

  return (
    <form
      action="https://formspree.io/f/xpwwyavp"
      method="POST"
      onSubmit={handleSubmit}
      className="bg-accentDarkSecondary px-6 sm:px-8 lg:px-12 py-6 w-full md:w-1/2 "
    >
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-5 text-dark text-center uppercase">
          Reach Us
        </h2>
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full px-3 py-2 text-dark placeholder-gray-400 bg-light border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            className="w-full px-3 py-2 text-dark placeholder-gray-400 bg-light border rounded"
          />
        </div>

        <textarea
          rows={3}
          placeholder="Message"
          name="message"
          className="mb-4 w-full px-3 py-2 text-dark placeholder-gray-400 bg-light border rounded"
        />

        <button className="px-12 py-3 text-xl font-semibold border-2 border-dark text-light hover:text-dark uppercase transition-all duration-150 ease-linear bg-dark hover:bg-light rounded-lg block mx-auto">
          Submit
        </button>

        {/* Success or Error Message */}
        {status === "success" && (
          <p className="text-green-600 mt-4 text-center">Thank you for your message! We will get back to you soon.</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4 text-center">Oops! Something went wrong. Please try again.</p>
        )}
      </div>
    </form>
  );
}
