// path → content component. Static imports keep the SSR bundle resolvable.
import About from './About.jsx'
import Privacy from './Privacy.jsx'
import Learn from './Learn.jsx'
import History from './History.jsx'
import Faq from './Faq.jsx'
import Prosigns from './Prosigns.jsx'
import QCodes from './QCodes.jsx'
import PhoneticAlphabet from './PhoneticAlphabet.jsx'
import FamousMessages from './FamousMessages.jsx'
import Terms from './Terms.jsx'
import Contact from './Contact.jsx'
import MorseChart from './MorseChart.jsx'
import MorseTranslator from './MorseTranslator.jsx'
import MorseTrainer from './MorseTrainer.jsx'
import DispatchBoard from './DispatchBoard.jsx'
import FirstCwQso from './dispatches/first-cw-qso.jsx'
import BreakingThePlateau from './dispatches/breaking-the-plateau.jsx'
import StraightKeyBugPaddle from './dispatches/straight-key-bug-paddle.jsx'
import LearningByEar from './dispatches/learning-by-ear.jsx'
import ReadingTheBands from './dispatches/reading-the-bands.jsx'
import QrpFiveWatts from './dispatches/qrp-five-watts.jsx'
import WireAntennaBudget from './dispatches/wire-antenna-budget.jsx'
import NumbersStations from './dispatches/numbers-stations.jsx'
import FieldKit from './dispatches/field-kit.jsx'
import WhyCwSurvives from './dispatches/why-cw-survives.jsx'

export const REGISTRY = {
  '/about': About,
  '/privacy': Privacy,
  '/learn': Learn,
  '/history': History,
  '/faq': Faq,
  '/prosigns': Prosigns,
  '/q-codes': QCodes,
  '/phonetic-alphabet': PhoneticAlphabet,
  '/famous-messages': FamousMessages,
  '/terms': Terms,
  '/contact': Contact,
  '/morse-code-chart': MorseChart,
  '/morse-translator': MorseTranslator,
  '/morse-trainer': MorseTrainer,
  '/dispatches': DispatchBoard,
  '/dispatches/first-cw-qso': FirstCwQso,
  '/dispatches/breaking-the-plateau': BreakingThePlateau,
  '/dispatches/straight-key-bug-paddle': StraightKeyBugPaddle,
  '/dispatches/learning-by-ear': LearningByEar,
  '/dispatches/reading-the-bands': ReadingTheBands,
  '/dispatches/qrp-five-watts': QrpFiveWatts,
  '/dispatches/wire-antenna-budget': WireAntennaBudget,
  '/dispatches/numbers-stations': NumbersStations,
  '/dispatches/field-kit': FieldKit,
  '/dispatches/why-cw-survives': WhyCwSurvives,
}

export const componentFor = (path) => REGISTRY[path] || null
