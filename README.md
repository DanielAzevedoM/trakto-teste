# trakto-teste
Código desenvolvido para o teste de vaga da trakto.

## Funcionalidade

A aplicação tem uma Rota Post com a url ${BASE_URL}/image/save`, que receberá o link de uma imagem pública, salvará e fará uma cópia comprimida dessa imagem colocando o sufixo _thumb no nome dessa imagem. 

Caso a imagem do link venha com seu maior tamanho menor que 720px, fará somente cópia da imagem adicionando o sufixo _thumb nela.

Ao finalizar a compressão da imagem, a aplicação salvará os metadados da imagem original em uma instância de banco de dados mongoDb.

Essa url receberá uma requisição com as seguintes propriedades do body: 

```
{   
    "image": "Url deImagem",
    "compress": 0.9
}
```

# Instalação e uso

Para instalar as depêndencias utilize o comando: 

$ npm install

Para rodar a aplicação:

$ npm run start:dev





