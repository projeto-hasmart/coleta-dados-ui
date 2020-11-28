# HASMART COLETA-DADOS FRONT-END -- Angular
 Utiliza a versão 8 do Angular, porém qualquer versão instalada localmente que seja superior a esta funcionará também.
 O Front-End só funcionará caso o Back-End também esteja funcionando

# Angular
Angular é uma plataforma de aplicações web de código-fonte aberto e front-end baseado em TypeScript liderado pela Equipe Angular do Google e por uma comunidade de indivíduos e corporações. Angular é uma reescrita completa do AngularJS, feito pela mesma equipe que o construiu.

# SPA
Um aplicativo de página única (em inglês "single-page application", ou SPA) é uma aplicação web ou site que consiste de uma única página web com o objetivo de fornecer uma experiência do usuário similar à de um aplicativo desktop. Em um SPA, todo o código necessário - HTML, JavaScript/TypeScript, e CSS – ou é obtido com um único carregamento de página, ou os recursos apropriados são carregados dinamicamente e adicionados à página conforme necessário, geralmente em resposta a ações do usuário. A página não é recarregada em qualquer momento do processo, tampouco ocorre a transferência de controle para outra página, embora a URL no navegador ou a API de história do HTML5 possam ser usadas para fornecer a percepção e navegabilidade de páginas separadas ao aplicativo. Interação com aplicativos de página única muitas vezes envolve comunicação dinâmica com o servidor web por trás dos bastidores.

# Passos iniciais
* INSTALE O NODE.JS NA MÁQUINA ( https://nodejs.org/en/download/ )
* INSTALE O GIT ( https://git-scm.com/downloads )
* BAIXE O FORTICLIENT 
* Conectar a VPN via app baixado utilizando Usuário, senha e arquivo .ovpn fornecido pela SESA;
* Ir no GitLab e fazer log-in;
* Acessar o site do projeto: http://172.35.0.34/HASmart/coleta-dados-ui
* Acessar a pasta que deseja salvar o projeto, usando seu terminal/prompt de comando;
* Digitar ```git clone http://172.35.0.34/HASmart/coleta-dados-ui```
* Entrar na pasta coleta-dados-ui via terminal( ```cd coleta-dados-ui``` );
* Digitar ```code .``` para abrir o VSCode;
* Ativar o Back-End do projeto e o IS4

# Já utilizando o código no VSCode:
* 1. Abrir um Terminal dentro do VSCode;
* 2. No terminal, digitar ```npm install``` se for a primeira vez;
* 3. No terminal, digitar 
 ```npm i @angular/flex-layout@8.0.0-beta.27```, ```sudo npm install jspdf@1.5.3``` e depois ```npm i ngx-device-detector@1.3.20``` se for a primeira vez;
* 4. Digitar ```(sudo) npm start```;
* 5. Acessar http://localhost:4200/;

# Estrutura

Pasta src:
  * Auth -> Se encontram páginas de login e autenticação de usuário(ainda será trabalhado)
  * Layout -> Contém partes do código como header e menu lateral, que são utilizados para todas as páginas
  * models -> Contém models para as classes/interfaces utilizadas como objeto no código
  * pages -> contém as páginas do módulo em si.
  * services -> os services da aplicação, onde se conecta com a API Back-End

Pasta pages:
  * pages -> A página principal, que contém os dados em comum de todas as páginas(a SPA)
  * pagina-cidadaos -> contém a página de cidadãos, de visualizar dados do cidadão(e edição, com um modal que é construído dentro desta) e de cadastrar um cidadão
  * pagina-dispensacao -> antigo conteúdo do projeto, não é mais utilizado
  * pagina-farmacia -> página para cadastro de uma nova farmácia, apenas admins podem utilizar ela
  * pagina-inicio -> página inicial onde se recebe a pessoa que fez login e também dá a opção de já buscar um cidadão
  * pagina-medicamentos -> antigo conteúdo do projeto, não é mais utilizado
  * pagina-medicao -> página que é chamada quando se deseja fazer uma medição de um cidadão

Root:
  * proxy.config.json -> configuração de proxy para conexão da API e evitar erros de CORS. 
  
São recomendadas as extensões "Angular Language Service(by Angular)" e "Angular Extension Pack(by Loiane Groner)" no VSCode, pois estas facilitam a organização do código Angular

