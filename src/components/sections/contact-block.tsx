import { Eyebrow } from "@/components/primitives/eyebrow";
import { Text } from "@/components/primitives/text";

const EMAIL = "hasan.jsdev@gmail.com";

export function ContactBlock() {
  return (
    <section
      id="hire"
      aria-labelledby="contact-title"
      className="px-[var(--gutter)] py-32 md:py-48"
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col gap-10">
        <Eyebrow>Contact</Eyebrow>
        <h2
          id="contact-title"
          className="font-[family-name:var(--font-display)] text-[length:var(--text-5xl)] leading-[var(--leading-heading)] tracking-[var(--tracking-tight)] sm:text-[length:var(--text-display)] sm:leading-[var(--leading-display)] sm:tracking-[var(--tracking-display)]"
        >
          Let&apos;s build{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="slant-italic text-[var(--color-accent)] underline decoration-[3px] underline-offset-[0.12em] hover:no-underline"
          >
            something
          </a>
          .
        </h2>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-[length:var(--text-base)]">
          <a
            href={`mailto:${EMAIL}`}
            className="text-[var(--color-fg)] underline-offset-4 hover:underline"
          >
            {EMAIL}
          </a>
          <Text variant="small">Dhaka, BD · Available for select work</Text>
        </div>
        <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[length:var(--text-sm)]">
          <li>
            <a
              className="hover:text-[var(--color-link)]"
              href="https://github.com/rockreyad"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
          </li>
          <li>
            <a
              className="hover:text-[var(--color-link)]"
              href="https://www.linkedin.com/in/rockreyad"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a
              className="hover:text-[var(--color-link)]"
              href="https://twitter.com/rockreyad"
              target="_blank"
              rel="noopener noreferrer"
            >
              X / Twitter ↗
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
