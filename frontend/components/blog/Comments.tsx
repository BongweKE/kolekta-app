import type { PostComment } from "@/lib/sanity/types";
import { CommentForm } from "./CommentForm";

type Props = {
  postSlug: string;
  comments: PostComment[];
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Comments({ postSlug, comments }: Props) {
  return (
    <section
      className="mt-12 pt-8"
      style={{ fontFamily: "var(--font-primary)", borderTop: "1px solid #DDDDC8" }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "#003020", letterSpacing: "-0.02em" }}
      >
        Comments {comments.length > 0 && <span style={{ color: "#8A8A72" }}>({comments.length})</span>}
      </h2>

      {comments.length > 0 ? (
        <ul className="flex flex-col gap-5 mb-8">
          {comments.map((comment) => (
            <li
              key={comment._id}
              className="rounded-xl px-5 py-4"
              style={{ backgroundColor: "#F0F0E0", border: "1px solid #DDDDC8" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    backgroundColor: "#E8E8D0",
                    color: "#003020",
                  }}
                >
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-semibold" style={{ color: "#003020" }}>
                    {comment.name}
                  </span>
                  <span className="text-xs ml-2" style={{ color: "#8A8A72" }}>
                    {formatDate(comment._createdAt)}
                  </span>
                </div>
              </div>
              <p className="text-sm whitespace-pre-wrap" style={{ color: "#616150", lineHeight: 1.7 }}>
                {comment.body}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm mb-8" style={{ color: "#8A8A72" }}>
          No comments yet — be the first to share your thoughts.
        </p>
      )}

      <CommentForm postSlug={postSlug} />
    </section>
  );
}
