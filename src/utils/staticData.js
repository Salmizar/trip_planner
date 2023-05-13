export const userList = [
    {
        uId:'4eXCxrmeJRcrUoaqMGGngCQKWUy1',
        displayName:'C DAoust',
        email: 'daoust.chris@gmail.com'
    },
    {
        uId:'48eXCxrmeJRcHFD45DJTDFJHBUfaFF',
        displayName:'Chantal Perreault',
        email: 'chantal.d.perreault@gmail.com'
    },
    {
        uId:'4egU7sFewfsSAsfaFSAStewtmynNYHMngCQKWUy1',
        displayName:'Trevor Delam',
        email: 't.delam@gmail.com'
    },
    {
        uId:'HGDSSDGDSDDSffdsJRcrUoaqMGGngCQKWUy1',
        displayName:'Ryan',
        email: 'Ryan.ellis@gmail.com'
    },
    {
        uId:'98J9M9898mjDM89jm98Mj98MojkahmNIUN',
        displayName:'Kyle Wylie',
        email: 'Wylie.coyote@gmail.com'
    },
    {
        uId:'98J9k13KKDldkXSsaxaK12K2WO0UN',
        displayName:'Eric la May',
        email: 'Eric.la.may@gmail.com'
    }
];
export const calendarColors = {
    //Credit https://proactivecreative.com/pastel-color-palette/
    Lavender: "#957DAD",
    Thistle_Pink: "#E0BBe4",
    Candy_Pink: "#FEC8D8",
    Misty_Rose: "#FFDFD3",
    Pastel_Pink: "#FFC4C4",
    Periwinkle: "#CBC7DD",
    Pale_Orange: "#FFDFBD",
    Palest_Yellow: "#F8FFEB",
    Pale_Sea_Blue: "#BAEEE5",
    Lilac: "#DFC5E8",
    Soft_Yellow: "#FFFAB0",
    Tea_Green: "#CBF2B8",
    Baby_Blue: "#D6D8F2",
    Baby_Pink: "#F4CFDF",
    Soft_Yellow: "#FAF4B7",
    Light_Brandy: "#E7CBA9",
    Soft_Sage: "#CCD4BF",
    Ecru: "#F5F3E7",
    Pastel_Peach: "#EEBAB2",
    Warm_Sand: "#E9DAC1",
    Light_Turquoise: "#CDFCF6",
    Sea_Green: "#54BAB90",
    Linen: "#F7ECDE",
    Muted_Blue: "#7882A4",
    Warm_Brown: "#C0A080",
    Light_Gray: "#EFEFEF",
    Medium_Gray: "#D1D1D1",
    Deep_Aubergine: "#645CAA",
    Medium_Purple: "#A084CA",
    Lavender: "#BFACE0",
    Pale_Purple_Pink: "#EBC7E8",
    Warm_Sun: "#D37F40",
    Sea_Blue: "#94C0D0",
    Pale_Coral: "#ECCBC0",
    Soft_Orange: "#FAC590",
    Warm_Pink: "#EF7C8E",
    Rose_Pink: "#D8A7B1",
    Cream: "#FAE8EO",
    Mint_Green: "#B6E2D3",
    Pale_Sea_Blue: "#D6EFED",
    Sky_Blue: "#B7D3DF",
    Medium_Lilac: "#C9BBCF",
    Muted_Purple: "#898AA6",
    Warm_Berry: "#85586F",
    Soft_Raspberry: "#AC7D88",
    Pale_Orange: "#DEB6AB",
    Soft_Yellow: "#F8ECD1",
    Slate_Blue: "#698396",
    Medium_Green: "#A9C8C0",
    Warm_Yellow: "#DBBC8E",
    Rich_Blush_Pink: "#AE8A8C",
    Sunny_Yellow: "#F5F0BB",
    Spring_Green: "#C4DFAA",
    Medium_Green: "#90C8AC",
    Dark_Turquoise: "#73A9AD"
}
export const calendarData = [
    {
        name: '2 Day Trip',
        startDate: 1683086400000,//may 3
        endDate: 1683172800000,//May 4
        driveUpDate: 1683086400000,//may 3
        driveHomeDate: 1683172800000,//May 4
        color: 'lightblue',
        location: 'Just going to Mattawa',
        notes: '16ome5 notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'Small 2 Day Trip',
        startDate: 1683259200000,//may 5
        endDate: 1683259200000,//May 5
        driveUpDate: 1683259200000,//may 5
        driveHomeDate: 1683259200000,//May 5
        color: 'lemonchiffon',
        location: 'Meet at the Esso in Rolphton',
        notes: 's165651651651ome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'Chic Chocs',
        startDate: 1683259200000,//may 5
        endDate: 1683432000000,//may 7
        driveUpDate: 1683172800000,//may 4
        driveHomeDate: 1683432000000,//may 7
        color: 'burlywood',
        location: 'someLocationText',
        notes: 'as5x1ad6csome notes about the trip',
        canInvite: false,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            },
            {
                uId: '3',
                name: 'Trevor Delam',
                maybe: true
            },
            {
                uId: '4',
                name: 'Eric La May',
                maybe: true
            },
            {
                uId: '5',
                name: 'Kyle Wylie'
            }
        ]
    },
    {
        name: 'Mattawa',
        startDate: 1683345600000,//may 6
        endDate: 1683432000000,//may 7
        driveUpDate: 1683345600000,//may 6
        driveHomeDate: 1683432000000,//may 7
        color: 'darkseagreen',
        location: 'someLocationText',
        notes: 'dfklvjna vkjad vfadsome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'big overlap',
        startDate: 1683432000000,//may 7
        endDate: 1684209600000,//May 16
        driveUpDate: 1683432000000,//may 7
        driveHomeDate: 1684296000000,//May 17
        color: 'lightgray',
        location: 'someLocationText',
        notes: 'fdvkj 34fkl4nf 1lsome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust'
            },
            {
                uId: 'sdcd',
                name: 'Chantal Perreault',
                eventOwner: true
            },
            {
                uId: 'MGGngCQKWUy1',
                name: 'Ryan Ellis'
            }
        ]
    },
    {
        name: 'month overlap',
        startDate: 1685160000000,//may 27
        endDate: 1685592000000,//June 1
        driveUpDate: 1685160000000,//may 27
        driveHomeDate: 1685592000000,//June 1
        color: 'lightseagreen',
        location: 'someLocationText',
        notes: 'q g4 qk qkgn1q 3kgj1n gklj1 jknsome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'End of May event',
        startDate: 1685332800000,//may 29
        endDate: 1685592000000,//June 1
        driveUpDate: 1685332800000,//may 29
        driveHomeDate: 1685592000000,//June 1
        color: 'lightpink',
        location: 'someLocationText',
        notes: 'dfv f6v5sfv6 s0fv65 0va6f5v0a65 1v0asome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'A Long Trip',
        startDate: 1684296000000,//may 17
        endDate: 1684382400000,//May 18
        driveUpDate: 1684296000000,//may 17
        driveHomeDate: 1684382400000,//May 18
        color: 'lightpink',
        location: 'someLocationText',
        notes: 'ae;vkn 34kj1 34gjsome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'Chic Chocs 2',
        startDate: 1684382400000,//may 18
        endDate: 1684641600000,//may 21
        driveUpDate: 1684382400000,//may 18
        driveHomeDate: 1684641600000,//may 21
        color: 'greenyellow',
        location: 'someLocationText',
        notes: 'ewfklqm flk4mf ;l3k4 some notes about the trip',
        canInvite: true,
        guestsCanModify: true,
        guests: [
            {
                uId: 'celkdje2edlk2',
                name: 'Ryan Ellis',
                eventOwner: true
            },
            {
                uId: 'scdscecdsc_lkdje2edlk2',
                name: 'Richie Drunkie',
                maybe: true
            }
        ]
    },
    {
        name: 'Small Day Trip 2',
        startDate: 1684468800000,//may 19
        endDate: 1684468800000,//May 19
        driveUpDate: 1684468800000,//may 19
        driveHomeDate: 1684468800000,//may 19
        color: 'salmon',
        location: 'someLocationText',
        notes: 'rmkq3 4fklm3 gklsome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'Mattawa 2',
        startDate: 1684555200000,//may 20
        endDate: 1684641600000,//may 21
        driveUpDate: 1684555200000,//may 20
        driveHomeDate: 1684641600000,//may 21
        color: 'lightsteelblue',
        location: 'someLocationText',
        notes: ' 43klgm q3glk;m 34glksome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'Random name',
        startDate: 1683604800000,//may 9
        endDate: 1683691200000,//may 10
        driveUpDate: 1683604800000,//may 9
        driveHomeDate: 1683691200000,//may 10
        color: 'orange',
        location: 'someLocationText',
        notes: 'rg q4klgmq 34;glk qm34gksome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    },
    {
        name: 'Chantal',
        startDate: 1683691200000,//may 10
        endDate: 1683864000000,//may 12
        driveUpDate: 1683691200000,//may 10
        driveHomeDate: 1683864000000,//may 12
        color: 'lightcoral',
        location: 'Right in the Valios parking lot',
        notes: 'er;lkm gmqergkmq er;lgkmqe l;gkqme some notes about the trip',
        canInvite: false,
        guestsCanModify: true,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            },
            {
                uId: '2',
                name: 'Chantal Perreault'
            }
        ]
    },
    {
        name: 'Eric',
        startDate: 1683777600000,//may 11
        endDate: 1683777600000,//may 11
        driveUpDate: 1683777600000,//may 11
        driveHomeDate: 1683777600000,//may 11
        color: 'lightskyblue',
        location: 'someLocationText',
        notes: 'ae;rlkvm erl;km r;elkm erl;kgmqe r;msome notes about the trip',
        canInvite: true,
        guestsCanModify: false,
        guests: [
            {
                uId: '4eXCxrmeJRcrUoaqMGGngCQKWUy1',
                name: 'Chris DAoust',
                eventOwner: true
            }
        ]
    }
]
for (var id = 0; id < calendarData.length; id++) {
    calendarData[id].eId = id + 1;
}
calendarData.sort((a, b) => {
    return a.driveUpDate - b.driveUpDate;
});