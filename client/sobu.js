
if (Meteor.isClient) {

  Template.station.helpers({
    kanji: function () {
      // TODO: use location information
      return "本八幡"; 
    },
    hiragana: function () {
      // TODO: use location information
      return "もとやわた";
    }
  });

}