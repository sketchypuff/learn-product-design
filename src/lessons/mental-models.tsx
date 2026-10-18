import {
  Diagram,
  DiagramAccent,
  DiagramBright,
  DiagramFaint,
  H2,
  P,
  Strong,
  Ul,
} from '@/components/prose'

export const headings = [
  { id: 'start-from-the-problem', title: 'Start from the problem' },
  { id: 'design-is-trade-offs', title: 'Design is a series of trade-offs' },
  { id: 'ship-to-learn', title: 'Ship to learn' },
]

export function MentalModels() {
  return (
    <>
      <P>
        Tools change every year. The way good product designers think changes much more slowly. This
        course spends less time on which buttons to press in which app, and more on the habits of
        mind that make the work good no matter what you build it in.
      </P>
      <P>
        Three ideas run underneath every lesson that follows. You’ll meet each of them again in more
        detail later, so you don’t need to master them now. Read them once, slowly, and keep them in
        the back of your head as you go.
      </P>

      <H2 id="start-from-the-problem">Start from the problem</H2>
      <P>
        Most briefs arrive as a solution in disguise: “add a dashboard”, “we need an onboarding
        flow”, “make the settings page cleaner”. It’s tempting to open a design tool and start
        drawing, because drawing feels like progress.
      </P>
      <P>
        Before you draw anything, find out what’s actually going wrong for someone. Who is
        struggling, at which moment, and what does it cost them? A dashboard is an answer. “Account
        managers find out a customer is unhappy only when they cancel” is a problem, and it has many
        possible answers, a dashboard being only one of them.
      </P>
      <Diagram label="A brief rewritten from solutions into a single problem">
        <DiagramAccent>{'[ WHAT THE BRIEF SAID ]'}</DiagramAccent>
        {'\n\n'}
        <DiagramFaint>{'  add a dashboard              '}</DiagramFaint>
        {'\n'}
        <DiagramFaint>{'  send weekly email reports    '}</DiagramFaint>
        {'\n'}
        <DiagramFaint>{'  show a health score          '}</DiagramFaint>
        {'\n\n'}
        <DiagramAccent>{'[ WHAT WAS ACTUALLY WRONG ]'}</DiagramAccent>
        {'\n\n'}
        <DiagramBright>{'  account managers hear about '}</DiagramBright>
        {'\n'}
        <DiagramBright>{'  unhappy customers too late  '}</DiagramBright>
      </Diagram>
      <P>
        Once the problem is clear, the options widen. Maybe the right answer is a single
        notification, not a whole new screen. You can only see that if you started from the problem.
      </P>

      <H2 id="design-is-trade-offs">Design is a series of trade-offs</H2>
      <P>
        There is no perfect design, only designs that give up the right things. Every choice spends
        something. A denser table shows more data but is harder to scan. A friendly illustration
        adds warmth and also pushes the useful content down the page. A setting adds control and
        also adds a decision the user has to make.
      </P>
      <P>
        Good designers make these trade-offs on purpose and can say what they gave up and why. When
        someone asks “why is it like this?”, the answer shouldn’t be “it looked nice”. It should
        sound like:
      </P>
      <Ul>
        <li>
          <Strong>Who</Strong> this is for, and what they’re trying to do.
        </li>
        <li>
          <Strong>What</Strong> we optimised for, such as speed, clarity, or trust.
        </li>
        <li>
          <Strong>What</Strong> we knowingly made worse to get there.
        </li>
      </Ul>
      <Diagram label="Two layouts compared on scan speed, detail and learnability">
        <DiagramAccent>{'[ COMPACT TABLE ]          [ CARDS ]'}</DiagramAccent>
        {'\n\n'}
        {'  scan speed  '}
        <DiagramAccent>{'■■■■■'}</DiagramAccent>
        <DiagramFaint>{'·'}</DiagramFaint>
        {'      scan speed  '}
        <DiagramAccent>{'■■'}</DiagramAccent>
        <DiagramFaint>{'····'}</DiagramFaint>
        {'\n'}
        {'  detail      '}
        <DiagramAccent>{'■■■■■■'}</DiagramAccent>
        {'      detail      '}
        <DiagramAccent>{'■■■'}</DiagramAccent>
        <DiagramFaint>{'···'}</DiagramFaint>
        {'\n'}
        {'  learnable   '}
        <DiagramAccent>{'■■'}</DiagramAccent>
        <DiagramFaint>{'····'}</DiagramFaint>
        {'      learnable   '}
        <DiagramAccent>{'■■■■■'}</DiagramAccent>
        <DiagramFaint>{'·'}</DiagramFaint>
      </Diagram>
      <P>
        Neither layout is wrong. One suits an expert who visits ten times a day, the other suits
        someone who visits once a month. Naming the trade-off is what turns taste into a decision
        your team can discuss.
      </P>

      <H2 id="ship-to-learn">Ship to learn</H2>
      <P>
        A design is a guess about how people will behave. You don’t find out whether the guess was
        right by polishing it. You find out by putting it in front of people, watching what they do,
        and changing it.
      </P>
      <P>
        That doesn’t mean shipping sloppy work. It means making the smallest thing that can answer
        your biggest open question, then shipping that. A paper sketch can test whether people
        understand a flow. A clickable prototype can test whether they find the button. Only the
        real product can test whether they come back next week.
      </P>
      <Diagram label="The design loop: guess, build the smallest test, watch, adjust">
        {'      ┌──────────── '}
        <DiagramAccent>guess</DiagramAccent>
        {' ◄───────────┐\n'}
        {'      ▼                            │\n'}
        {'  '}
        <DiagramBright>build the smallest test</DiagramBright>
        {'       '}
        <DiagramBright>adjust</DiagramBright>
        {'\n'}
        {'      │                            ▲\n'}
        {'      └──────────► '}
        <DiagramAccent>watch people</DiagramAccent>
        {' ─────┘'}
      </Diagram>
      <P>
        The designers who improve fastest aren’t the ones with the best first drafts. They’re the
        ones who go round this loop the most times. Every lesson in this course is, in some way,
        about going round it faster and with better guesses.
      </P>
    </>
  )
}
