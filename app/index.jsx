import { useRef, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ActionButton } from "./components/ActionButton";
import { FokusButton } from "./components/FokusButton";
import { IconPause, IconPlay } from "./components/Icons";
import { Timer } from "./components/Timer";


const pomodoro = [
  {
    id: 'focus',
    initialValue: 25,
    image: require('./Imagem_foco.png'),
    display: 'Foco'
  },
  {
    id: 'short',
    initialValue: 5,
    image: require('./Imagem_descanso_curto.png'),
    display: 'Pausa curta'
  },
  {
    id: 'long',
    initialValue: 15,
    image: require('./Imagem_descanso_longo.png'),
    display: 'Pausa longa'
  }
]


export default function Index() {

  const [timerType, setTimerType] = useState(pomodoro[0]);

  const [seconds, setSeconds] = useState(pomodoro[0].initialValue*60)

  const [timerRunning, setTimerRunning] = useState(false);

  const timerRef = useRef(null);

  const clear = () => {
    if (timerRef.current != null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTimerRunning(false);
    }
  }

  
 const toogleTimerType = (newTimerType) => {
  clear();
  setTimerType(newTimerType);
  setSeconds(newTimerType.initialValue * 60);

}

const toggleTimer = () => {
  if (timerRef.current) {
    clear()
    return
  }

  setTimerRunning(true)

const id = setInterval(() => {
  setSeconds(oldState => {
    if (oldState === 0) {
      clear();
      return 0;
    }
    return oldState - 1;
  })
  console.log('timer rolando');
}, 1000);
  
  timerRef.current = id;
};



return (
  <View style={styles.container}>

    <Image source={timerType.image}
      style={{ width: 300, height: 300 }} />
    <View style={styles.actions}>
      <View style={styles.context}>
        {pomodoro.map(p => (
          <ActionButton
            key={p.id}
            active={timerType.id === p.id}
            onPress={() => toogleTimerType(p)}
            display={p.display}
          />
        ))}
      </View>
      <Timer totalSeconds={seconds} />
      <FokusButton
        title={timerRunning ? 'Pausar' : 'Começar'}
        icons ={timerRunning ? <IconPause/> : <IconPlay/>}
        onPress={toggleTimer} />
    </View >
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        Projeto fictício e sem fins comerciais.
      </Text>
      <Text style={styles.footerText}>
        Desenvolvido por Alura.
      </Text>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#021123",
    gap: 40,
  },
  actions: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    backgroundColor: "#14448080",
    width: "80%",
    borderRadius: 32,
    borderColor: "144480",
    borderWidth: 2,
    gap: 32,
  },

  footer: {
    width: '80%',
  },

  footerText: {
    textAlign: 'center',
    fontweight: 400,
    color: "#98A0A8",
    fontSize: 12.5,
  },

  context: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  }
});
