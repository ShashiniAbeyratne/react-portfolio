import { Hero } from "@/features/hero";
import { InitLoader } from "@/features/init-loader";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Screen } from "@/shared/types/screen.types";

const hasSeenInit = sessionStorage.getItem("portfolio_init_seen") === "1"

export function HomePage() {
  const [screen, setScreen] = useState<Screen>(hasSeenInit ? Screen.Hero : Screen.Loader)
  const navigate = useNavigate()

  return (
    <AnimatePresence mode="wait">
        {screen === Screen.Loader &&
            <InitLoader key={Screen.Loader} onComplete={() => setScreen(Screen.Hero)} />}
        {screen === Screen.Hero &&
            <Hero key={Screen.Hero} onEnterChat={() => navigate("/chat")} />}
    </AnimatePresence>
  )
}
