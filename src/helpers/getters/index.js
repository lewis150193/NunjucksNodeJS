const axios = require('axios');
const {ifStatement} = require("../util");

exports.nameParam = (req,res) => {
    const data = {
        firstName: req.params.name
    };
    res.render('index.njk', data);
};

exports.base = async (req,res) => {
     const charactersArr = [];
     const data = await axios.get('https://rickandmortyapi.com/api/character/');
     const characters = await  data.data.results;
     characters.map(character => {
            const characterObj = {
                name: character.name,
                image: character.image
            };
            charactersArr.push(characterObj)
        })

            //Data must be a object.
            const dataToPush  = {
                characters: charactersArr,
                Title: 'Characters From Title'
            };
            res.render('useBase.njk', dataToPush)
};

exports.macro = (req,res) => {
    const data = {
        colorName: 'black',
        colorValue: 'some colour',
        colorNotes: 'This is some news about the color'
    };
    res.render('mac.njk', data)
};

exports.confirmation = (req,res) => {
    res.render('signIn.njk');

};



exports.ifFunc = (req,res) => {
    const data = {
        variable: ifStatement()
    };
    res.render('iffunc.njk', data)
};

exports.getCharacters = (req,res) => {
    const charactersArr = [];
    axios.get('https://rickandmortyapi.com/api/character/')
        .then( data => data.data.results)
        .then( characters => characters.map( character => {
            const characterObj = {
               name: character.name,
               image: character.image
            };
            charactersArr.push(characterObj)
        }))
        .then( () => {
            //Data must be a object.
            const data = {
                characters: charactersArr
            };
            res.render('getCharacters.njk', data)
        });
};





exports.getCharacter = (req,res) => {
    const charactersArr = [];
    axios.get(`https://rickandmortyapi.com/api/character/${req.params.id}`)
        .then( data => data.data)
        .then(  character => {
            const characterObj = {
                name: character.name,
                image: character.image
            };
            charactersArr.push(characterObj)
        })
        .then( () => {
            //Data must be a object.
            const data = {
                characters: charactersArr
            };
            res.render('getCharacters.njk', data)
        });
};
