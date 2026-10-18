import { H2, P, Ul } from '@/components/prose'

export const headings = [
  { id: 'who-its-for', title: 'Who it’s for' },
  { id: 'how-to-use-it', title: 'How to use it' },
]

export function Intro() {
  return (
    <>
      <P>
        This is a free, self-paced course on product design: deciding what a digital product should
        do, how it should behave, and how it should look, then working with others to make it real.
      </P>

      <H2 id="who-its-for">Who it’s for</H2>
      <P>
        It’s written for people at the start of their design career, and for engineers, product
        managers, and founders who want to make better product decisions. You don’t need any design
        tool experience to follow along.
      </P>

      <H2 id="how-to-use-it">How to use it</H2>
      <Ul>
        <li>Read the Fundamentals in order. Later lessons build on them.</li>
        <li>After that, jump to whichever lesson matches what you’re working on this week.</li>
        <li>Mark a lesson complete when you’re done, so the home page shows your progress.</li>
      </Ul>
      <P>New lessons are added over time. Ones marked “Soon” are being written.</P>
    </>
  )
}
