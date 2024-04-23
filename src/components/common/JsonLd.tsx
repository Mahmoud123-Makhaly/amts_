'use client';

export const JsonLd = ({ html }: { html: string }) => {
  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </section>
  );
};
