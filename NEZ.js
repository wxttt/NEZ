Users = new Meteor.Collection("users");
Events = new Meteor.Collection("events")

if (Meteor.isClient) {
    Template.zheng.users = function(){
        return Users.find({});
    }

    Template.zheng.events = function(){
        return Events.find({}, {sort: {time: -1}});
    }

    Template.user.selected = function () {
        return Session.equals("selected_player", this._id) ? "selected" : '';
    };

    Template.user.events({
        'click .add': function (_event) {
            Users.update({_id:this._id}, {$inc: {score: 1}})
            Events.insert({name:this.name, event: '被狠狠的加了一笔!', time: new Date().getTime()});
        },
        'click .minus': function(_event){
            console.log('min');
            Users.update({_id:this._id}, {$inc: {score: -1}})
            Events.insert({name:this.name, event: '贱贱的减去了一笔!', time: new Date().getTime()});
        },
        'click .bg': function(_event){
            if(this.score >= 5){
                Users.update({_id:this._id}, {$inc: {score: -5}})
                Events.insert({name:this.name, event: '慷慨的bg了大家！', time: new Date().getTime()});
            }else{
                alert("尚未凑齐5笔，无法召唤bg大神！")
            }
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
        if (Users.find().count() === 0) {
            var names = ["林大灰狼",
                "老姜",
                "李伟",
                "杨姐",
                "施德来",
                "朱33",
                "詹副帅",
                "王筱"];
            for (var i = 0; i < names.length; i++)
                Users.insert({name: names[i], score: 0});
        }
    });
}
