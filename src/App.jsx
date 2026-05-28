import { useTheme, ThemeProvider } from './Components/ThemeContext'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import About from './Components/About'
import { Routes,Route } from 'react-router-dom'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
import Achievements from './Components/Certification'
import Education from './Components/Education'
import GlobalStyles from './Components/GlobalStyle'


function AppShell() {
  const { t } = useTheme()

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main style={{ transition: 'background 0.4s' }}>
        <section id="home">         <Home />         </section>
        <section id="about">        <About />        </section>
        <section id="projects">     <Projects />     </section>
        <section id="skills">       <Skills />       </section>
        <section id="achievements"> <Achievements /> </section>
        <section id="education">    <Education />    </section>
        <section id="contact">      <Contact />      </section>
      </main>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}