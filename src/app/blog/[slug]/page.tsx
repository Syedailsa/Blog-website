import AllComments from "@/components/all-comments";
import AddComment from "@/components/comments";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

export const revalidate = 60;


// This function makes all the slugs available to the static site generator
// so that it can generate the static pages for each slug

 export async function generateStaticParams() {
  const query = `*[_type=='post']{
    "slug":slug.current
  }`;
  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((item:{slug:string})=>(
    item.slug
  ));
  console.log(slugRoutes)
  return slugRoutes.map((slug:string)=>(
    {slug}
  ))
}

export default async function page({params:{slug}}:{params:{slug:string}}) {

  const query = `*[_type == "blog" && slug.current == "${slug}"]{
  _id,
  title,
  summary,
  image,
  content,
  author->{bio, image, name},
  "comments": *[_type == "comment" && post._ref == ^._id ]{
      name,
      comment,
      _createdAt,
    }
}[0]`;
  const post = await client.fetch(query);
  console.log(post)
  return (
    <article className="mt-12 mb-24 px-2 2xl:px-12 flex flex-col gap-y-8">

      {/* Blog Title */}
      <h1 className="text-xl xs:text-3xl lg:text-5xl font-bold text-dark dark:text-light">
        {post.title}
      </h1>

      {/* Featured Image */}
      <Image
        src={urlFor(post.image).url()}
        width={500}
        height={500}
        alt={post.title}
        className="rounded"
      />

      {/* Blog Summary Section */}
      <section>
      <h2 className="text-xl xs:text-2xl md:text-3xl font-bold uppercase text-accentDarkPrimary">
        Summary
      </h2>
      <p className="text-base md:text-xl leading-relaxed text-justify text-dark/80 dark:text-light/80">
        {post.summary}
      </p>
      </section>

      {/* Author Section (Image & Bio) */}
      <section className="px-2 sm:px-8 md:px-12 flex gap-2 xs:gap-4 sm:gap-6 items-start xs:items-center justify-start">
        <Image
          src={urlFor(post.author.image).url()}
          width={200}
          height={200}
          alt="author"
          className="object-cover rounded-full h-12 w-12 sm:h-24 sm:w-24"
        />
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-dark dark:text-light">{post.author.name}</h3>
          <p className="italic text-xs xs:text-sm sm:text-base text-dark/80 dark:text-light/80">
            {post.author.bio}
          </p>
        </div>
      </section>

      {/* Main Body of Blog */}
      <section className="text-lg leading-normal text-dark/80 dark:text-light
      prose-h3:text-black prose-strong:text-accentDarkPrimary prose-h3:text-3xl prose-h2:text-4xl prose-h2:font-bold prose-h3:font-bold
      prose-li:list-disc prose-li:list-inside prose-li:marker:text-accentDarkSecondary
     dark:prose-h3:text-white dark:prose-h2:text-white">

        <PortableText value={post.content}/>

      </section>

      {/* Comments Section */}
      <AddComment postId={post._id} />
      <AllComments
        comments={post.comments}
        slug={post?.slug?.current} />
    </article>
  );
}