const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const explanationElement = document.getElementById("explanation");
const finalScoreElement = document.getElementById("final-score");

let currentQuestion = 0;
let score = 0;

const questions = [
  {
    question: "Durante uma frenagem brusca, um carro reduz sua velocidade de 108 km/h para 36 km/h em 5 segundos. Qual fórmula permite calcular a desaceleração nesse processo?",
    options: [
      "$a = \\frac{\\Delta v}{\\Delta t}$",
      "$s = s_0 + v t$",
      "$v = v_0 + a t$",
      "$\\Delta s = v_0 t + \\frac{1}{2} a t^2$"
    ],
    answer: 0,
    explanation: "A desaceleração é a variação de velocidade dividida pelo tempo: $a = \\frac{\\Delta v}{\\Delta t}$"
  },
  {
    question: "Um satélite em órbita circular ao redor da Terra se mantém a uma altura constante devido à força centrípeta. Qual fórmula representa essa força?",
    options: [
      "$F_c = \\frac{m v^2}{r}$",
      "$F = m \\cdot g$",
      "$F = k \\cdot \\frac{q_1 q_2}{r^2}$",
      "$F = m \\cdot a$"
    ],
    answer: 0,
    explanation: "A força centrípeta mantém o satélite na órbita e é dada por: $F_c = \\frac{m v^2}{r}$"
  },
  {
    question: "Um bloco desliza por um plano inclinado sem atrito. Qual fórmula permite calcular a componente da força peso que atua ao longo do plano inclinado?",
    options: [
      "$F = m g \\sin \\theta$",
      "$F = m g \\cos \\theta$",
      "$F = \\frac{1}{2} m v^2$",
      "$F = m g$"
    ],
    answer: 0,
    explanation: "A força que atua ao longo do plano é a componente do peso: $F = m g \\sin \\theta$"
  },
  {
    question: "Em um circuito elétrico com três resistores em paralelo, qual expressão correta para a resistência equivalente?",
    options: [
      "$\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$",
      "$R_{eq} = R_1 + R_2 + R_3$",
      "$R_{eq} = \\frac{R_1 R_2 R_3}{R_1 + R_2 + R_3}$",
      "$R_{eq} = \\sqrt{R_1^2 + R_2^2 + R_3^2}$"
    ],
    answer: 0,
    explanation: "Para resistores em paralelo, usa-se: $\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\frac{1}{R_3}$"
  },
  {
    question: "Um feixe de luz passa de um meio menos refringente para um meio mais refringente. Qual fórmula está associada à mudança de direção da luz?",
    options: [
      "$n_1 \\cdot \\sin \\theta_1 = n_2 \\cdot \\sin \\theta_2$",
      "$v = f \\cdot \\lambda$",
      "$\\lambda = \\frac{v}{f}$",
      "$E = h \\cdot f$"
    ],
    answer: 0,
    explanation: "A Lei de Snell descreve a refração da luz: $n_1 \\cdot \\sin \\theta_1 = n_2 \\cdot \\sin \\theta_2$"
  },
  {
    question: "Ao aproximar um objeto de um espelho côncavo, a imagem formada passa de real e invertida para virtual e direita. Qual equação governa essa formação?",
    options: [
      "$\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
      "$f = R$",
      "$\\frac{f}{R} = 2$",
      "$\\frac{1}{f} = \\frac{1}{p} - \\frac{1}{p'}$"
    ],
    answer: 0,
    explanation: "A equação dos espelhos é: $\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$, válida para qualquer posição do objeto."
  },
  {
    question: "Uma onda sonora é refletida por uma parede e captada novamente, formando um eco. Qual grandeza está diretamente relacionada ao tempo de percepção do eco?",
    options: [
      "$v = \\frac{2d}{\\Delta t}$",
      "$\\lambda = \\frac{v}{f}$",
      "$f = \\frac{1}{T}$",
      "$E = h \\cdot f$"
    ],
    answer: 0,
    explanation: "Como o som vai e volta, a distância percorrida é o dobro: $v = \\frac{2d}{\\Delta t}$"
  },
  {
    question: "Em um transformador ideal, a tensão de saída depende da razão entre o número de espiras. Qual equação descreve isso?",
    options: [
      "$\\frac{V_s}{V_e} = \\frac{N_s}{N_e}$",
      "$V = R \\cdot I$",
      "$P = \\frac{\\Delta E}{\\Delta t}$",
      "$U = \\frac{Q}{C}$"
    ],
    answer: 0,
    explanation: "A equação do transformador é: $\\frac{V_s}{V_e} = \\frac{N_s}{N_e}$"
  },
  {
    question: "Durante uma colisão perfeitamente inelástica, dois corpos se juntam após o choque. Qual grandeza se conserva nesse tipo de interação?",
    options: [
      "$Q = m c \\Delta T$",
      "$p = m v$",
      "$E = m g h$",
      "$E_c = \\frac{1}{2} m v^2$"
    ],
    answer: 1,
    explanation: "Na colisão inelástica, a quantidade de movimento $p = m v$ é conservada, mesmo que haja perda de energia mecânica."
  },
  {
    question: "Um fio metálico se aquece ao ser percorrido por corrente elétrica. Qual equação relaciona a energia dissipada com o tempo?",
    options: [
      "$E = R i^2 t$",
      "$E = P / t$",
      "$P = i / R$",
      "$R = \\rho \\frac{L}{A}$"
    ],
    answer: 0,
    explanation: "A energia dissipada no efeito Joule é: $E = R i^2 t$"
  },
      {
        question: "Uma ponte é construída considerando a dilatação dos trilhos metálicos no verão. Qual fórmula prevê a variação no comprimento desses trilhos com a temperatura?",
        options: [
          "$\\Delta L = L_0 \\cdot \\alpha \\cdot \\Delta T$",
          "$Q = m \\cdot c \\cdot \\Delta T$",
          "$\\tau = F \\cdot d$",
          "$\\lambda = \\frac{v}{f}$"
        ],
        answer: 0,
        explanation: "A fórmula da dilatação linear térmica é: $\\Delta L = L_0 \\cdot \\alpha \\cdot \\Delta T$"
      },
      {
        question: "Um mergulhador nota variações na pressão conforme aumenta a profundidade. Qual fórmula relaciona essa pressão com a profundidade?",
        options: [
          "$P = P_0 + \\rho g h$",
          "$F = m \\cdot a$",
          "$E_p = m g h$",
          "$P = \\frac{F}{A}$"
        ],
        answer: 0,
        explanation: "A pressão em um fluido aumenta com a profundidade: $P = P_0 + \\rho g h$"
      },
      {
        question: "Para determinar o empuxo sobre um corpo totalmente submerso, qual fórmula usamos?",
        options: [
          "$E = \\rho_{líquido} \\cdot g \\cdot V$",
          "$P = F / A$",
          "$F = m g$",
          "$\\tau = F \\cdot d$"
        ],
        answer: 0,
        explanation: "O empuxo é a força devida à pressão exercida pelo líquido: $E = \\rho g V$"
      },
      {
        question: "Uma turbina é movimentada pela água de uma represa. Qual fórmula expressa a energia potencial da água armazenada?",
        options: [
          "$E_p = m g h$",
          "$E_c = \\frac{1}{2}mv^2$",
          "$\\tau = F \\cdot d$",
          "$E = P \\cdot t$"
        ],
        answer: 0,
        explanation: "A energia potencial gravitacional da água em altura é: $E_p = m g h$"
      },
      {
        question: "Uma corrente elétrica aquece uma resistência de chuveiro. Qual equação determina a potência elétrica dissipada?",
        options: [
          "$P = R i^2$",
          "$P = U i$",
          "$Q = m c \\Delta T$",
          "$P = F v$"
        ],
        answer: 0,
        explanation: "A potência dissipada pode ser calculada com $P = R i^2$"
      },
      {
        question: "Para determinar o calor necessário para fundir uma substância sem alterar sua temperatura, qual fórmula é utilizada?",
        options: [
          "$Q = m L_f$",
          "$Q = m c \\Delta T$",
          "$Q = P t$",
          "$\\Delta L = L_0 \\alpha \\Delta T$"
        ],
        answer: 0,
        explanation: "O calor latente de fusão é dado por: $Q = m L_f$"
      },
      {
        question: "Durante a compressão de um gás em uma seringa fechada, qual lei relaciona a pressão e o volume, mantendo a temperatura constante?",
        options: [
          "$P_1 V_1 = P_2 V_2$",
          "$\\frac{P}{T} = \\text{constante}$",
          "$V = n R T$",
          "$P V = n R T$"
        ],
        answer: 0,
        explanation: "A Lei de Boyle: $P_1 V_1 = P_2 V_2$"
      },
      {
        question: "Ao aquecer um gás dentro de um recipiente fechado, ele se expande. Qual lei explica a relação entre volume e temperatura, a pressão constante?",
        options: [
          "$\\frac{V}{T} = \\text{constante}$",
          "$P_1 V_1 = P_2 V_2$",
          "$P = \\frac{F}{A}$",
          "$Q = m c \\Delta T$"
        ],
        answer: 0,
        explanation: "A Lei de Charles: $\\frac{V}{T} = \\text{constante}$ (pressão constante)"
      },
      {
        question: "Um aluno observa a corrente elétrica mudando ao alterar a tensão em um resistor fixo. Qual lei está sendo aplicada?",
        options: [
          "$U = R i$",
          "$P = U i$",
          "$Q = m c \\Delta T$",
          "$R = \\rho \\cdot \\frac{L}{A}$"
        ],
        answer: 0,
        explanation: "A lei de Ohm: $U = R i$"
      },
      {
        question: "Uma carga elétrica se move num campo elétrico uniforme. Qual fórmula representa a força sobre essa carga?",
        options: [
          "$F = q E$",
          "$F = m a$",
          "$F = B i L$",
          "$\\tau = F d$"
        ],
        answer: 0,
        explanation: "A força elétrica sobre uma carga em campo elétrico é: $F = q E$"
      },
      {
        question: "Um fio condutor sofre variação de resistência ao alterar sua espessura. Qual fórmula expressa essa resistência em função das dimensões do fio?",
        options: [
          "$R = \\rho \\cdot \\frac{L}{A}$",
          "$U = R i$",
          "$P = i^2 R$",
          "$Q = m c \\Delta T$"
        ],
        answer: 0,
        explanation: "A resistência depende do material e dimensões: $R = \\rho \\cdot \\frac{L}{A}$"
      },
      {
        question: "Em uma espira circular imersa num campo magnético, qual equação representa a força magnética sobre um trecho do fio com corrente?",
        options: [
          "$F = B i L$",
          "$F = q E$",
          "$F = m a$",
          "$\\tau = F d$"
        ],
        answer: 0,
        explanation: "A força magnética é dada por $F = B i L$, quando corrente e campo são perpendiculares"
      },
      {
        question: "Durante o funcionamento de um gerador, energia mecânica é convertida em energia elétrica. Qual fórmula relaciona energia e tempo?",
        options: [
          "$P = \\frac{E}{\\Delta t}$",
          "$P = U i$",
          "$Q = m c \\Delta T$",
          "$F = q E$"
        ],
        answer: 0,
        explanation: "Potência é a razão entre energia e tempo: $P = \\frac{E}{\\Delta t}$"
      },
      {
        question: "Uma bola é lançada verticalmente para cima. No ponto mais alto da trajetória, qual energia é máxima?",
        options: [
          "$E_p = m g h$",
          "$E_c = \\frac{1}{2} m v^2$",
          "$Q = m c \\Delta T$",
          "$E = P t$"
        ],
        answer: 0,
        explanation: "No ponto mais alto, toda energia cinética se converteu em potencial: $E_p = m g h$"
      },
      {
        question: "A luz branca ao passar por um prisma sofre decomposição em várias cores. Qual grandeza varia ao mudar de meio?",
        options: [
          "$\\lambda$ (comprimento de onda)",
          "$f$ (frequência)",
          "$T$ (período)",
          "$E = m g h$"
        ],
        answer: 0,
        explanation: "Ao mudar de meio, a frequência se mantém, mas o comprimento de onda $\\lambda$ muda"
      },
      {
        question: "Em uma prensa hidráulica, uma força pequena aplicada em um pistão menor gera grande força em um maior. Qual princípio está envolvido?",
        options: [
          "$P_1 = P_2$",
          "$F = m a$",
          "$\\tau = F d$",
          "$Q = m c \\Delta T$"
        ],
        answer: 0,
        explanation: "A prensa hidráulica funciona com base na igualdade das pressões: $P_1 = P_2$"
      },
      {
        question: "Uma partícula é lançada obliquamente com velocidade inicial. Qual fórmula permite calcular a altura máxima atingida?",
        options: [
          "$H = \\frac{v_0^2 \\cdot \\sin^2 \\theta}{2g}$",
          "$s = s_0 + v t$",
          "$E = P t$",
          "$F = m g$"
        ],
        answer: 0,
        explanation: "Altura máxima no lançamento oblíquo: $H = \\frac{v_0^2 \\cdot \\sin^2 \\theta}{2g}$"
      },
      {
        question: "Um carro faz uma curva circular em alta velocidade. Qual fórmula representa a aceleração centrípeta nessa curva?",
        options: [
          "$a_c = \\frac{v^2}{r}$",
          "$a = \\frac{\\Delta v}{\\Delta t}$",
          "$F = m a$",
          "$\\tau = F d$"
        ],
        answer: 0,
        explanation: "A aceleração centrípeta é: $a_c = \\frac{v^2}{r}$"
      },
      {
        question: "Em um sistema massa-mola ideal, qual fórmula descreve a constante elástica da mola quando há deformação?",
        options: [
          "$F = k x$",
          "$E = P t$",
          "$Q = m c \\Delta T$",
          "$F = m g$"
        ],
        answer: 0,
        explanation: "Lei de Hooke para molas: $F = k x$"
      },
      {
        question: "Durante a evaporação de um líquido à temperatura constante, qual equação determina o calor envolvido?",
        options: [
          "$Q = m L_v$",
          "$Q = m c \\Delta T$",
          "$P = U i$",
          "$\\tau = F d$"
        ],
        answer: 0,
        explanation: "O calor de vaporização é dado por: $Q = m L_v$"
      },
  {
    question: "Ao pressionar o pedal de um carro por alguns segundos, o velocímetro mostra aumento gradual da velocidade. Qual equação melhor representa esse fenômeno?",
    options: [
      "$v = v_0 + at$",
      "$s = s_0 + vt$",
      "$a = \\frac{\\Delta v}{\\Delta t}$",
      "$F = m \\cdot a$"
    ],
    answer: 0,
    explanation: "A equação $v = v_0 + at$ descreve a velocidade em função do tempo em um movimento uniformemente acelerado."
  },
  {
    question: "Ao observar uma mola comprimida prestes a lançar um carrinho, qual fórmula representa a energia acumulada nesse sistema?",
    options: [
      "$E_{el} = \\frac{1}{2} k x^2$",
      "$E_p = mgh$",
      "$F = kx$",
      "$E_c = \\frac{1}{2} m v^2$"
    ],
    answer: 0,
    explanation: "A energia elástica de uma mola comprimida é dada por $E_{el} = \\frac{1}{2} k x^2$"
  },
  {
    question: "Um avião pousa e percorre uma distância até parar. Qual fórmula relaciona a velocidade inicial, aceleração e distância percorrida sem tempo?",
    options: [
      "$v^2 = v_0^2 + 2a\\Delta s$",
      "$\\Delta s = \\frac{v + v_0}{2} t$",
      "$s = s_0 + vt$",
      "$a = \\frac{\\Delta v}{\\Delta t}$"
    ],
    answer: 0,
    explanation: "A equação de Torricelli relaciona as grandezas sem depender do tempo: $v^2 = v_0^2 + 2a\\Delta s$"
  },
  {
    question: "Num dia quente, um corpo de metal é deixado ao sol e aquece. Qual fórmula nos permite estimar a quantidade de calor absorvido?",
    options: [
      "$Q = mc\\Delta T$",
      "$P = \\frac{\\Delta E}{\\Delta t}$",
      "$E = mgh$",
      "$F = m a$"
    ],
    answer: 0,
    explanation: "A quantidade de calor recebida é dada por $Q = mc\\Delta T$"
  },
  {
    question: "Em um oscilador harmônico simples como um pêndulo, qual fórmula determina o tempo necessário para uma oscilação completa?",
    options: [
      "$T = 2\\pi \\sqrt{\\frac{l}{g}}$",
      "$T = \\frac{1}{f}$",
      "$v = \\lambda \\cdot f$",
      "$f = \\frac{1}{T}$"
    ],
    answer: 0,
    explanation: "Para um pêndulo simples, o período depende da raiz quadrada do comprimento: $T = 2\\pi \\sqrt{\\frac{l}{g}}$"
  },
  {
    question: "Ao deixar uma bola cair de uma janela e medir a altura da queda, qual fórmula permite calcular o tempo que ela leva até atingir o solo?",
    options: [
      "$h = \\frac{1}{2}gt^2$",
      "$v = gt$",
      "$E_p = mgh$",
      "$v^2 = 2gh$"
    ],
    answer: 0,
    explanation: "Para um objeto em queda livre sem velocidade inicial, usamos $h = \\frac{1}{2}gt^2$"
  },
  {
    question: "Num sistema isolado, uma bala atinge e se aloja em um bloco em repouso. Qual fórmula representa a conservação da quantidade de movimento?",
    options: [
      "$m_1 v_1 = (m_1 + m_2) v_f$",
      "$F = m a$",
      "$E_c = \\frac{1}{2}mv^2$",
      "$P = U I$"
    ],
    answer: 0,
    explanation: "Em colisões perfeitamente inelásticas, a quantidade de movimento é conservada: $m_1 v_1 = (m_1 + m_2) v_f$"
  },
  {
    question: "A força elétrica entre duas cargas pontuais é medida. Qual fórmula descreve corretamente essa interação?",
    options: [
      "$F = k \\frac{q_1 q_2}{r^2}$",
      "$F = m a$",
      "$U = R I$",
      "$E = mc^2$"
    ],
    answer: 0,
    explanation: "A Lei de Coulomb descreve a força entre duas cargas: $F = k \\frac{q_1 q_2}{r^2}$"
  },
  {
    question: "Ao passar corrente por uma lâmpada, observamos sua luminosidade aumentar com a tensão. Qual expressão relaciona potência com corrente e tensão?",
    options: [
      "$P = U I$",
      "$U = R I$",
      "$P = R I^2$",
      "$E = P t$"
    ],
    answer: 0,
    explanation: "A potência elétrica fornecida é dada por $P = U I$"
  },
  {
    question: "Um recipiente contém um gás ideal em expansão isotérmica. Qual relação entre pressão e volume permanece constante?",
    options: [
      "$P V = \\text{constante}$",
      "$P T = \\text{constante}$",
      "$V T = \\text{constante}$",
      "$P = kT$"
    ],
    answer: 0,
    explanation: "Na transformação isotérmica (temperatura constante), $P V = \\text{constante}$ segundo a lei de Boyle."
  },
  {
    question: "Em um mergulho submarino, a pressão aumenta com a profundidade. Qual fórmula expressa essa variação?",
    options: [
      "$P = P_0 + \\rho g h$",
      "$P = F/A$",
      "$F = m a$",
      "$U = R I$"
    ],
    answer: 0,
    explanation: "A pressão em um fluido aumenta linearmente com a profundidade: $P = P_0 + \\rho g h$"
  },
  {
    question: "Uma lente convergente forma uma imagem real e invertida. Qual equação relaciona as distâncias focais, do objeto e da imagem?",
    options: [
      "$\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$",
      "$f = \\frac{p p'}{p + p'}$",
      "$M = \\frac{p'}{p}$",
      "$\\tan \\theta = \\frac{h'}{p'}$"
    ],
    answer: 0,
    explanation: "A equação das lentes é $\\frac{1}{f} = \\frac{1}{p} + \\frac{1}{p'}$"
  },
  {
    question: "Uma barra de metal é esticada com uma força. Qual fórmula determina a deformação elástica em função da força aplicada?",
    options: [
      "$\\Delta L = \\frac{F L_0}{A E}$",
      "$F = m g$",
      "$E = mc\\Delta T$",
      "$\\tau = F d$"
    ],
    answer: 0,
    explanation: "A Lei de Hooke generalizada para tração longitudinal é: $\\Delta L = \\frac{F L_0}{A E}$"
  },
  {
    question: "Ao se projetar um corpo para cima, sua velocidade atinge zero no ponto mais alto. Qual equação relaciona altura máxima com velocidade inicial?",
    options: [
      "$h = \\frac{v_0^2}{2g}$",
      "$v = v_0 + at$",
      "$h = v_0 t - \\frac{1}{2} g t^2$",
      "$v^2 = v_0^2 - 2 g h$"
    ],
    answer: 0,
    explanation: "A altura máxima em lançamento vertical é dada por: $h = \\frac{v_0^2}{2g}$"
  },
  {
    question: "Ao analisar um sistema com atrito, é necessário incluir a força resistiva. Qual equação expressa a força de atrito cinético?",
    options: [
      "$F_{at} = \\mu N$",
      "$F = m a$",
      "$\\tau = F d$",
      "$R = \\rho \\frac{L}{A}$"
    ],
    answer: 0,
    explanation: "A força de atrito cinético é proporcional à normal: $F_{at} = \\mu N$"
  },
  {
    question: "Durante a rotação de uma roda, um ponto na borda percorre uma trajetória circular. Qual fórmula define a velocidade angular?",
    options: [
      "$\\omega = \\frac{\\theta}{t}$",
      "$v = \\omega r$",
      "$a = \\frac{\\Delta v}{\\Delta t}$",
      "$T = \\frac{1}{f}$"
    ],
    answer: 0,
    explanation: "Velocidade angular é definida por $\\omega = \\frac{\\theta}{t}$"
  },
  {
    question: "Uma partícula carregada move-se em campo magnético uniforme. Qual força atua perpendicularmente à sua velocidade?",
    options: [
      "$F = q v B \\sin \\theta$",
      "$F = m a$",
      "$E = mc^2$",
      "$\\tau = F d$"
    ],
    answer: 0,
    explanation: "A força magnética sobre uma carga em movimento é dada por $F = q v B \\sin \\theta$"
  },
  {
    question: "Ao encostar um objeto metálico em outro eletrizado, há transferência de cargas. Qual lei explica essa conservação?",
    options: [
      "$q_1 + q_2 = \\text{constante}$",
      "$F = k \\cdot \\frac{q_1 q_2}{r^2}$",
      "$U = R I$",
      "$P = U I$"
    ],
    answer: 0,
    explanation: "A conservação da carga elétrica implica $q_1 + q_2 = \\text{constante}$"
  },
  {
    question: "A dilatação linear de um trilho de ferro em dias quentes pode causar deformações. Qual fórmula calcula essa variação?",
    options: [
      "$\\Delta L = L_0 \\cdot \\alpha \\cdot \\Delta T$",
      "$Q = mc \\Delta T$",
      "$v = \\lambda f$",
      "$E = P t$"
    ],
    answer: 0,
    explanation: "A variação do comprimento com temperatura é dada por $\\Delta L = L_0 \\cdot \\alpha \\cdot \\Delta T$"
  },
  {
    question: "Um corpo com massa elevada sofre aceleração muito pequena sob uma força constante. Qual grandeza explica isso?",
    options: [
      "$a = \\frac{F}{m}$",
      "$F = k q_1 q_2 / r^2$",
      "$E_c = \\frac{1}{2} m v^2$",
      "$\\tau = F d$"
    ],
    answer: 0,
    explanation: "A aceleração é inversamente proporcional à massa: $a = \\frac{F}{m}$"
  }
];

function startGame() {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  currentQuestion = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionElement.innerHTML = `Questão ${currentQuestion + 1}: ${q.question}`;
  optionsContainer.innerHTML = "";
  explanationElement.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerHTML = option;
    btn.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(btn);
  });

  MathJax.typeset(); // Renderiza fórmulas
}

function checkAnswer(selected) {
  const q = questions[currentQuestion];
  if (selected === q.answer) {
    score++;
    explanationElement.innerHTML = "<strong>Correto!</strong> " + q.explanation;
  } else {
    explanationElement.innerHTML = "<strong>Errado.</strong> " + q.explanation;
  }
  document.querySelectorAll("#options-container button").forEach(btn => btn.disabled = true);
  MathJax.typeset(); // Renderiza fórmulas na explicação
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  gameScreen.style.display = "none";
  endScreen.style.display = "block";
  finalScoreElement.textContent = `Você acertou ${score} de ${questions.length} questões.`;
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  endScreen.style.display = "none";
  startScreen.style.display = "block";
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartGame);
