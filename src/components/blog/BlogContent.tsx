import {
  BLOG_IMAGE_BASE,
  isHtmlContent,
  plainTextToParagraphs,
  resolveContentAssetUrls,
} from '@/lib/blog/format';

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  if (!content.trim()) return null;

  if (isHtmlContent(content)) {
    const html = resolveContentAssetUrls(content, BLOG_IMAGE_BASE);
    return (
      <div
        className="blog-content prose prose-lg max-w-none text-brand-dark/85 prose-headings:text-brand-dark prose-a:text-brand-primary"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  const paragraphs = plainTextToParagraphs(content);

  return (
    <div className="blog-content space-y-5 text-base leading-relaxed text-brand-dark/85 md:text-lg">
      {paragraphs.map((paragraph, index) => {
        const isHeading =
          paragraph.length < 120 &&
          !paragraph.endsWith('.') &&
          /^[A-Z0-9]/.test(paragraph);

        if (isHeading) {
          return (
            <h2
              key={index}
              className="pt-2 text-xl font-bold text-brand-dark md:text-2xl"
            >
              {paragraph}
            </h2>
          );
        }

        return <p key={index}>{paragraph}</p>;
      })}
    </div>
  );
}
