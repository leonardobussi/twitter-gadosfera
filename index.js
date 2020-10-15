const Twit = require('twit')
const franc = require('franc')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'dados.csv',
    header: [
        {id: 'lingua', title: 'language'},
        {id: 'texto', title: 'tweet'}
    ]
});

const apikey = 'xxxxxx'
const apiSecretKey = 'xxxxxxx'
const accessToken = 'xxxxx'
const accessTokenSecret = 'xxxxx'

var T = new Twit({
  consumer_key:         apikey,
  consumer_secret:      apiSecretKey,
  access_token:         accessToken,
  access_token_secret:  accessTokenSecret,
});

(async () => {
  var dados = []
    var stream = T.stream('statuses/filter', { track: 'linda, lindo, gata, gato, gostosa, gostoso',  language: 'pt-br, br, pt, ptbr'  })
    stream.on('tweet', function (tweet) {
        console.log(tweet.text);
        console.log('Language: ' + franc(tweet.text));
        console.log('------');
        var texto = tweet.text
        var lingua = franc(tweet.text)
        dados.push({texto, lingua})

        fs.writeFile('dados.json',  JSON.stringify(dados, null, 2), err => {
          if(err) throw new Error('deu ruim')
        })

        csvWriter.writeRecords(dados)       
        .then(() => {
          console.log('...fim...');
        });
    })
   

    
})();

