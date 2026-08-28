# Base de Conhecimento - Atypical Frealer

Data da analise: 2026-08-28

## 1. Identidade do projeto

O Atypical Frealer e um projeto web estatico, criado em contexto academico, com foco em conscientizacao sobre o Transtorno do Espectro Autista (TEA), apoio a familias, divulgacao de instituicoes/campanhas de doacao e oferta de minijogos educativos.

Proposta central:

- Dar mais visibilidade a causa autista.
- Explicar, em linguagem acessivel, o que e o TEA e quais caracteristicas podem aparecer no espectro.
- Direcionar pessoas para instituicoes de apoio e doacao.
- Oferecer minijogos para estimular letramento, reconhecimento de emocoes, memoria e associacao visual.

Publico provavel:

- Familiares e cuidadores que buscam informacoes iniciais sobre TEA.
- Criancas em atividades educativas acompanhadas por responsaveis/professores.
- Pessoas interessadas em apoiar instituicoes ligadas a causa.
- Banca/professores avaliando o projeto como trabalho academico.

## 2. Estrutura atual do repositorio

A raiz real do app esta em `atypicalProjeto/`.

Principais pastas:

- `css/`: estilos das paginas institucionais e dos jogos.
- `js/`: scripts dos minigames e do fluxo de login do jogo da memoria.
- `imgs/`: imagens, audios e assets dos jogos/paginas.
- `docs/`: documentacao do projeto.

Tecnologias usadas:

- HTML estatico.
- CSS proprio.
- JavaScript puro.
- Bootstrap via CDN em varias paginas.
- Google Fonts via CDN em alguns estilos.
- Canvas API no jogo de associacao de animais.
- LocalStorage no jogo da memoria para armazenar o nome do jogador.

Nao ha, no momento da analise, `package.json`, build tool, framework frontend, testes automatizados ou configuracao de deploy.

## 3. Mapa de paginas

- `index.html`: pagina inicial com carrossel, chamada para doacoes, caracteristicas do autismo, instituicoes de apoio, FAQ e sobre nos.
- `o-que-e.html`: pagina informativa sobre TEA, causas, caracteristicas, niveis de suporte e habilidades possiveis.
- `perguntasFrequentes.html`: FAQ em accordion Bootstrap.
- `instituição.html`: lista instituicoes locais/regionais de apoio ao TEA.
- `doacao.html`: pagina com chamada de doacao e links para AUMA, AMA e FADA.
- `sobre.html`: descricao do projeto, proposta social e equipe.
- `abaminigame.html`: hub dos minigames.
- `minigame1.html`: jogo de letramento por montagem de palavras.
- `minegame2.html` + `indexgame2.html`: capa e jogo de reconhecimento de emocoes.
- `minegame3.html` + `indexgame3.html`: login e jogo da memoria com imagens de emocoes.
- `minegame4.html`: jogo de associacao de animais com canvas.

Observacao: ha inconsistencias de nomenclatura entre `minigame` e `minegame`, mas os links principais parecem seguir essa convencao atual.

## 4. Minigames atuais

### 4.1 Jogo de Letramento

Arquivos:

- `minigame1.html`
- `js/minigame1.js`
- `css/minigame1.css`
- `imgs/minigame1/`

Mecanica:

- Mostra uma imagem.
- Exibe letras embaralhadas.
- A crianca arrasta letras para lacunas ate formar a palavra correta.
- Usa pontuacao por estrelas.
- Possui suporte a mouse e toque.

Habilidades relacionadas:

- Reconhecimento visual.
- Associacao imagem-palavra.
- Formacao de palavras simples.
- Coordenacao motora fina em interacao drag-and-drop.

Riscos/melhorias:

- O arquivo usa textos com encoding quebrado em comentarios e mensagens.
- A imagem da estrela aponta para `img/estrela.png`, mas o repositorio possui `imgs/minigame1/estrela.png`.
- O botao "Remover Letras" reinicia as letras, mas o nome pode ser mais claro, como "Tentar de novo".
- Falta narracao/alternativa auditiva opcional para a palavra ou imagem.

### 4.2 Atypical Emotion

Arquivos:

- `minegame2.html`
- `indexgame2.html`
- `js/minigame2.js`
- `css/minigame2.css`
- `css/minigame2(1).css`
- `imgs/minegame2/`

Mecanica:

- Mostra uma imagem de expressao/estado.
- Usuario escolhe entre opcoes como Alegria, Tristeza, Raiva, Fome e Surpreso.
- Feedback imediato informa acerto ou resposta correta.

Habilidades relacionadas:

- Reconhecimento de emocoes.
- Vocabulario emocional.
- Tomada de decisao por alternativas.

Riscos/melhorias:

- "Fome" e um estado corporal, nao exatamente emocao; pode ser mantido se o jogo virar "emocoes e necessidades".
- "Surpreso" deveria ser padronizado como "Surpresa" se as demais respostas forem substantivos.
- As imagens precisam ser verificadas quanto a clareza, diversidade e licenciamento.
- Feedback de erro pode ser mais acolhedor e menos punitivo.

### 4.3 Memory Atypical

Arquivos:

- `minegame3.html`
- `indexgame3.html`
- `js/login.js`
- `js/game.js`
- `css/logingame3.css`
- `css/game3.css`
- `imgs/minigame3/`

Mecanica:

- Usuario informa nome.
- Jogo gera pares de cartas com emocoes.
- Timer conta o tempo ate finalizar.
- Ao encontrar todos os pares, exibe alerta com o tempo.

Habilidades relacionadas:

- Memoria visual.
- Atencao sustentada.
- Reconhecimento e nomeacao de emocoes.

Riscos/melhorias:

- Uso de `alert()` interrompe a experiencia e pode ser substituido por modal acessivel.
- `clearInterval(this.loop)` deveria provavelmente ser `clearInterval(loop)`.
- Falta botao de reiniciar, pausar e voltar claramente identificado.
- Nome do jogador fica em `localStorage`; tudo bem para uso local, mas convem explicar/limpar em versoes futuras.

### 4.4 Associacao de Animais

Arquivos:

- `minegame4.html`
- `js/minegame4.js`
- `css/minegame4.css`
- `imgs/minegame4/`

Mecanica:

- Usa canvas.
- Mostra imagens de animais ou curiosidades textuais.
- Usuario escolhe a alternativa correta.
- Controla vidas e fase.
- Tem musica de fundo acionada por botao.

Habilidades relacionadas:

- Associacao visual.
- Leitura de pistas simples.
- Vocabulario.
- Atencao e tomada de decisao.

Riscos/melhorias:

- `somErro` aponta para `sounds/somErro.mp3`, mas a pasta/arquivo nao apareceu na listagem.
- Textos com acentos estao quebrados em varias fases.
- Interacoes desenhadas em canvas nao sao naturalmente acessiveis para leitor de tela ou teclado.
- Musica deve ter controle claro de tocar/pausar e volume, pois pessoas autistas podem ter sensibilidades sensoriais.

## 5. Achados tecnicos prioritarios

### Alta prioridade

- Corrigir encoding quebrado em HTML, CSS e JS. Isso afeta leitura, apresentacao e acessibilidade.
- Resolver conflito de merge literal em `sobre.html` nas fotos de Pedro e Igor.
- Corrigir caminhos quebrados:
  - `abaminigame.html`: `/imgs/abaMinigame/associando.jpg` deveria provavelmente ser `imgs/abaMinigame/associando.jpg`.
  - `perguntasFrequentes.html`: `/css/index.css` deveria provavelmente ser `css/index.css`.
  - `doacao.css`: imagem com caminho absoluto `/imgs/...`.
  - `minigame1.html`: `img/estrela.png` deveria provavelmente ser `imgs/minigame1/estrela.png`.
  - `js/minegame4.js`: `sounds/somErro.mp3` nao foi encontrado.
- Padronizar `lang`: `sobre.html` esta como `en`, mas o conteudo e em portugues.
- Revisar links para `instituição.html`; nomes de arquivos com acento podem funcionar localmente, mas costumam gerar problemas em deploy/servidores. Sugestao futura: renomear para `instituicao.html` e atualizar links.

### Media prioridade

- Criar um componente/padrao unico de navbar e footer ou, se continuar estatico, manter blocos consistentes entre paginas.
- Padronizar versoes do Bootstrap, hoje ha 5.3.0, 5.3.5, 5.3.6 e 5.3.7.
- Melhorar `alt` das imagens: trocar `alt="..."` por descricoes reais.
- Evitar `button` contendo `a`; usar link estilizado como botao ou botao com evento.
- Criar pagina inicial dos jogos com descricoes breves e objetivos pedagogicos de cada jogo.
- Substituir `alert()` e `confirm()` por componentes acessiveis e previsiveis.

### Baixa prioridade

- Separar dados dos jogos em arrays/JSON mais organizados.
- Criar README com instalacao/uso.
- Adicionar licencas/creditos das imagens e audios.
- Criar checklist de validacao manual para cada minigame.

## 6. Diretrizes de acessibilidade para evolucao

Para um projeto sobre TEA, acessibilidade nao deve ser so requisito tecnico; deve ser parte da proposta social.

Prioridades recomendadas:

- Linguagem simples, objetiva e respeitosa.
- Navegacao previsivel e consistente.
- Contraste adequado entre texto e fundo.
- Botoes grandes, com area de toque confortavel.
- Feedback visual, textual e, quando houver som, tambem opcional.
- Evitar sons automaticos, animacoes fortes e excesso de estimulos.
- Permitir pausar musica/animacoes.
- Nao depender apenas de cor para indicar acerto/erro.
- Oferecer instrucoes curtas antes de cada jogo.
- Garantir uso por teclado nos jogos sempre que possivel.
- Em canvas, criar alternativa HTML acessivel ou controles espelhados fora do canvas.

## 7. Cuidados de conteudo sobre TEA

O projeto deve evitar apresentar o autismo como doenca a ser curada. A abordagem mais adequada e: condicao do neurodesenvolvimento, espectro diverso, necessidades variaveis de suporte e foco em inclusao, autonomia, bem-estar e direitos.

Sugestoes de revisao editorial:

- Trocar linguagem patologizante por linguagem centrada na pessoa ou linguagem identitaria, conforme contexto.
- Evitar promessas terapeuticas nos minigames. Eles podem "estimular", "apoiar", "praticar" ou "favorecer", mas nao devem prometer tratamento.
- Incluir aviso: os jogos nao substituem acompanhamento profissional.
- Atualizar estatistica de prevalencia: o site cita 1 em 36; o CDC publicou dado mais recente de cerca de 1 em 31 criancas de 8 anos nos EUA, referente a vigilancia de 2022.
- Separar "sinais comuns" de "criterios diagnosticos"; diagnostico deve ser feito por profissionais qualificados.

## 8. Pesquisas e fontes uteis

### TEA: dados, cuidado e direitos

- CDC - Data and Statistics on Autism Spectrum Disorder: dado recente de prevalencia estimada nos EUA, cerca de 1 em 31 criancas de 8 anos segundo a rede ADDM com vigilancia de 2022. Fonte: https://www.cdc.gov/autism/data-research/index.html
- OMS/WHO - Autism fact sheet: autismo como grupo diverso de condicoes relacionadas ao desenvolvimento cerebral; necessidades variam ao longo da vida; intervencoes psicossociais baseadas em evidencia podem melhorar comunicacao e habilidades sociais; acessibilidade e inclusao comunitaria sao essenciais. Fonte: https://www.who.int/westernpacific/newsroom/fact-sheets/detail/autism-spectrum-disorders
- Ministerio da Saude - Linha de Cuidado TEA na crianca: material brasileiro para fluxo de cuidado, sinais, acompanhamento e orientacoes no SUS. Fonte: https://linhasdecuidado.saude.gov.br/portal/transtorno-do-espectro-autista/
- Ministerio da Saude - Projeto Terapeutico Singular: cuidado centrado nas necessidades singulares da pessoa com TEA e familia, com autonomia, protagonismo, inclusao social e decisao compartilhada. Fonte: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/a/autismo/pts
- Senado Federal - Lei 12.764/2012, Lei Berenice Piana: institui a Politica Nacional de Protecao dos Direitos da Pessoa com TEA. Fonte: https://legis.senado.gov.br/norma/588140

### Jogos serios, emocoes e habilidades sociais

- Systematic review de 2024 sobre serious games para habilidades sociais em pessoas autistas: encontrou resultados positivos em varios estudos, mas a area ainda exige cautela metodologica. Fonte: https://pubmed.ncbi.nlm.nih.gov/38494122/
- Revisao sistematica em PMC sobre serious games para criancas e adolescentes autistas: estudos reportam melhora em pelo menos algum construto social, como reconhecimento emocional, regulacao emocional, atencao conjunta e habilidades comportamentais, mas com limitacoes e risco de vies. Fonte: https://pmc.ncbi.nlm.nih.gov/articles/PMC10931397/
- Meta-analise de 2022 sobre serious games para criancas com deficiencia intelectual e/ou TEA: aponta potencial para habilidades sociais, cognitivas e adaptativas. Fonte: https://www.sciencedirect.com/science/article/pii/S2212868922000228

### Acessibilidade cognitiva e web

- W3C WAI - Cognitive Accessibility: deficiencias cognitivas e de aprendizagem podem afetar percepcao, memoria, linguagem, atencao, resolucao de problemas e compreensao; tecnologia pode ajudar quando oferece navegacao, formatos e apresentacao flexiveis. Fonte: https://www.w3.org/WAI/cognitive/
- W3C WAI - Supplemental Guidance: recomenda deixar o proposito da pagina claro, usar hierarquia familiar, design consistente, passos claros, controles identificaveis e relacao clara entre controles e conteudo afetado. Fonte: https://www.w3.org/WAI/WCAG2/supplemental/

## 9. Trilhas futuras de evolucao

### Trilha 1 - Recuperacao tecnica

Objetivo: deixar o projeto renderizando corretamente.

- Corrigir encoding.
- Resolver conflito de merge em `sobre.html`.
- Corrigir caminhos de assets.
- Padronizar nomes de arquivos sem acentos.
- Conferir todas as paginas no navegador.

### Trilha 2 - Acessibilidade e inclusao

Objetivo: alinhar a experiencia com a causa do projeto.

- Melhorar `alt`, contraste, foco visivel e navegacao por teclado.
- Evitar feedback apenas por cor.
- Adicionar controles de som e reduzir estimulos.
- Adicionar instrucoes curtas e previsiveis nos jogos.
- Criar alternativas HTML para interacoes em canvas.

### Trilha 3 - Conteudo e credibilidade

Objetivo: tornar o site confiavel como fonte introdutoria.

- Revisar textos sobre TEA com fontes oficiais.
- Incluir referencias no fim das paginas informativas.
- Atualizar estatisticas.
- Diferenciar informacao educativa de orientacao clinica.
- Adicionar aviso de que o site nao substitui acompanhamento profissional.

### Trilha 4 - Produto educacional

Objetivo: fazer os minigames parecerem parte de uma metodologia.

- Definir objetivo pedagogico de cada jogo.
- Criar niveis de dificuldade.
- Adicionar progresso simples.
- Criar feedback positivo e orientado a tentativa.
- Registrar acertos/tempo localmente sem expor dados pessoais.

### Trilha 5 - Organizacao do codigo

Objetivo: facilitar manutencao.

- Criar `README.md`.
- Padronizar CSS global e CSS por jogo.
- Extrair dados dos jogos para objetos organizados.
- Remover duplicacoes de navbar/footer quando houver uma estrategia de build ou componentes.
- Adicionar checklist de QA manual.

## 10. Resumo executivo

O projeto tem uma ideia forte e socialmente coerente: unir informacao, apoio e jogos educativos em uma plataforma simples sobre TEA. O maior valor atual esta na combinacao entre paginas de conscientizacao/doacao e minigames praticos. Antes de adicionar novas funcionalidades, a prioridade deve ser estabilizar a base: corrigir encoding, conflitos de merge, caminhos quebrados e acessibilidade basica. Depois disso, o projeto pode evoluir para uma experiencia mais madura, com conteudo referenciado, jogos com objetivos pedagogicos explicitos e desenho sensivel as necessidades de pessoas autistas.

## 11. Refatoracao consciente aplicada

Objetivo da rodada: preservar a identidade humana e simples do Atypical Frealer, mas tornar o site mais rico, estudado e pedagogicamente responsavel.

Mudancas de conteudo e experiencia:

- O hub `Atypical Games` passou a explicar por que minigames gratuitos importam: muitos jogos para TEA citados em estudos aparecem como prototipos, ferramentas institucionais, softwares pagos ou solucoes pouco acessiveis ao publico geral.
- A home ganhou uma secao sobre minigames gratuitos, jogos serios e aprendizagem, reforcando que os jogos apoiam praticas educativas, mas nao substituem acompanhamento profissional.
- A pagina `o-que-e.html` ganhou uma secao sobre TEA, aprendizagem e tecnologia, com fontes de estudo.
- Cada minigame ganhou uma ficha pedagogica curta explicando objetivo, habilidade trabalhada e orientacao de uso mediado.
- Feedbacks dos jogos foram suavizados para valorizar tentativa e aprendizagem, em vez de apenas marcar erro.
- Mensagens dinamicas dos jogos receberam `aria-live` em pontos simples, melhorando retorno para tecnologias assistivas.

Limite etico adotado:

- O site nao promete tratamento, cura ou eficacia clinica.
- A linguagem usada e de apoio educacional: "praticar", "estimular", "apoiar", "favorecer" e "usar com mediacao".
- A validade dos minigames vem da aproximacao com principios encontrados na literatura: objetivos claros, repeticao, previsibilidade, apoio visual, feedback imediato, mediacao humana e foco em habilidades sociais/cognitivas especificas.

## 12. Evolucao dos minigames

Objetivo da segunda rodada: tirar a explicacao principal da home e concentrar a justificativa dos jogos na aba `Atypical Games`, alem de melhorar as mecanicas para que cada jogo ensine, entretenha e respeite boas praticas de acessibilidade cognitiva.

Mudancas aplicadas:

- A secao "Por que minigames gratuitos?" foi removida da home. A home volta a funcionar como apresentacao geral do Atypical.
- A aba de minigames agora explica:
  - por que os jogos surgiram dentro do projeto;
  - como eles ajudam na pratica educativa;
  - por que previsibilidade, clareza, apoio visual e mediacao sao importantes;
  - quais cuidados existem para nao prometer terapia ou eficacia clinica.
- O jogo de letramento ganhou:
  - mais palavras;
  - niveis simples;
  - dicas contextuais;
  - silabas;
  - alternativa por clique/teclado alem do arrastar;
  - feedback quando a palavra esta preenchida, mas precisa ser reorganizada.
- O jogo de emocoes ganhou:
  - fila embaralhada para evitar repeticao imediata constante;
  - contexto cotidiano para cada emocao/necessidade;
  - `alt` dinamico na imagem;
  - feedback que conecta resposta e situacao real.
- O jogo da memoria ganhou:
  - menos cartas por rodada para reduzir sobrecarga inicial;
  - feedback na propria tela;
  - cartas acessiveis por foco e teclado;
  - fim de jogo menos abrupto.
- O jogo de associacao de animais ganhou:
  - botoes HTML espelhando as opcoes do canvas;
  - feedback explicativo por resposta;
  - trava contra cliques repetidos durante a transicao;
  - tempo maior para leitura do retorno.

Racional pedagogico:

- Jogos para criancas com TEA devem favorecer previsibilidade, repeticao, instrucao simples, objetivo claro e feedback imediato.
- O erro deve ser tratado como tentativa, nao como punicao.
- A mediacao adulta continua importante para transferir a aprendizagem do jogo para situacoes reais.
- Acessibilidade motora e cognitiva melhora quando uma interacao nao depende de apenas um modo, como somente arrastar ou somente clicar em canvas.

## 13. Limite sobre sintomas e mudanca aplicada

Pergunta orientadora: os jogos atuais ajudam sintomas do TEA?

Resposta etica: nao e correto afirmar que os minigames tratam, reduzem ou melhoram sintomas clinicos do TEA. O que eles podem fazer, quando bem desenhados e usados com mediacao, e apoiar a pratica de habilidades funcionais frequentemente importantes para pessoas autistas: comunicacao, reconhecimento emocional, autorregulacao, atencao, memoria visual, vocabulário, categorizacao e flexibilidade cognitiva.

Mudancas feitas a partir dessa conclusao:

- O jogo de emocoes deixou de ser apenas reconhecimento de imagem e passou a incluir uma segunda etapa de estrategia segura: pedir ajuda, comunicar necessidade, fazer pausa ou entender uma situacao inesperada.
- O jogo de letramento passou a ligar cada palavra a uma frase-modelo, ajudando a transformar vocabulario em comunicacao funcional.
- O jogo da memoria passou a apresentar perguntas de conversa apos pares encontrados, favorecendo mediacao e generalizacao para situacoes reais.
- O jogo de associacao de animais recebeu fases de categoria e contexto, trabalhando comparacao, classificacao e flexibilidade.

Formula correta para apresentar o projeto:

- Evitar: "os jogos ajudam nos sintomas do TEA".
- Preferir: "os jogos apoiam a pratica de habilidades educacionais e socioemocionais associadas ao desenvolvimento de criancas com TEA, sem substituir acompanhamento profissional".

## 14. Melhorias visuais e editoriais do site

Objetivo da rodada: elevar a apresentacao geral do projeto, deixando o site mais rico, confiavel e visualmente maduro sem apagar a identidade original criada no primeiro periodo.

Mudancas aplicadas:

- A home ganhou uma introducao mais forte sobre o Atypical Frealer, com chamada para entender o TEA e conhecer os jogos.
- A home recebeu um bloco de conhecimento rapido com fatos verificados sobre diversidade do espectro, sinais iniciais, apoio e inclusao.
- A pagina de perguntas frequentes foi expandida com novas respostas sobre autismo nao ser doenca, sensibilidades sensoriais, uso dos minigames e quando buscar ajuda profissional.
- A pagina "O que e" recebeu um bloco de mitos e verdades para consulta rapida.
- A pagina de doacao ganhou uma secao de apoio responsavel, incentivando verificacao, divulgacao consciente e acompanhamento das instituicoes.
- A pagina "Sobre Nos" ganhou pilares de missao: informar, acolher e praticar.
- O CSS recebeu uma camada de refinamento visual: cards mais consistentes, blocos de destaque, melhor hierarquia tipografica, faixas de conteudo e responsividade.

Fontes e postura editorial:

- Informacoes sensiveis foram alinhadas a materiais da OMS, CDC, Ministerio da Saude e W3C/WAI.
- O site evita linguagem de cura ou promessa clinica.
- A proposta visual continua acolhedora e acessivel, com conteudo em blocos curtos para facilitar escaneamento e compreensao.

## 15. Redesign real dos minigames

Objetivo da rodada: deixar os minigames menos parecidos com exercicios improvisados e mais proximos de experiencias de aprendizagem e entretenimento. A restricao de manter o visual antigo foi relaxada para priorizar funcionalidade, clareza, acessibilidade e valor pedagogico.

Mudancas aplicadas:

- `Atypical Emotion` virou `Jornada das Emocoes`:
  - fluxo em duas etapas por rodada;
  - primeiro a crianca reconhece emocao ou necessidade;
  - depois escolhe uma atitude segura;
  - inclui frases-modelo como "Preciso de uma pausa" e "Estou com fome. Posso comer?";
  - trabalha reconhecimento emocional, comunicacao funcional e autorregulacao.
- `Jogo de Letramento` virou `Construtor de Palavras`:
  - deixou de depender de arrastar letras;
  - usa botoes grandes, lacunas claras, dicas, silabas e frases de uso;
  - treina relacao imagem-palavra, sequencia de letras, vocabulario e comunicacao funcional.
- `Memory Atypical` virou `Memoria das Emocoes`:
  - ganhou tela de jogo estruturada;
  - usa menos cartas por rodada para reduzir sobrecarga;
  - cada par encontrado gera uma pergunta de conversa;
  - trabalha memoria visual, atencao e nomeacao emocional com mediacao.
- `Associacao de Animais` virou `Trilha dos Animais`:
  - deixou de usar canvas como interacao principal;
  - agora usa interface HTML acessivel;
  - trabalha imagem, pista, categoria, contexto e explicacao;
  - favorece comparacao, classificacao, vocabulario e flexibilidade cognitiva.

Principio adotado:

- Entre manter uma mecanica fraca e criar uma experiencia melhor, a prioridade passou a ser aprendizagem funcional e entretenimento claro.
- Os jogos continuam nao prometendo tratar sintomas, mas agora treinam habilidades mais observaveis e transferiveis para conversas, pedidos, pausas e classificacoes do cotidiano.
