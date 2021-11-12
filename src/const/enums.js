export let WagonTypes = [
    {text:'BTW',value:1},
    {text:'TSW',value:2},
    {text:'KTW',value:3}
];
export let UserTypes = [
    {text:"Admin Level 1",value:1},
    {text:"Admin Level 2",value:2},
    {text:"Control Unit",value:3},
    {text:"Wagon's driver",value:4},
    {text:"Simple staff",value:5}
];

export let WorkdayTypes = [
    {text:"Working",value:1,color:"#66BB6A"},
    {text:"On-Call",value:2,color:"#BDBDBD"},
    {text:"Leave-Normal",value:3,color:"#81D4FA"},
    {text:"Leave-Sick",value:4,color:"#FFA726"},
    {text:"Absence",value:5,color:"#E53935"},
];

export let WagonHealthState = [
    {text:"Healthful",value:1},
    {text:"Unhealthy",value:2},
];

export let WagonInsuranceType = [
    {text:"Voll Kasko",value:1},
    {text:"Teil Kasko",value:2},
]

export let InsuranceTypes = [
    {text:"Public",value:1},
    {text:"Private",value:2},
]

export let Genehmigung = [
    {text:"Benötigt",value:3},
    {text:"Braucht Nicht",value:1},
    {text:"Genehmigt",value:2},
    
]

export let DesinfektionTypes = [
    {text:"Mission",value:1},
    {text:"Weekly",value:2},
    {text:"Special",value:3},
]

export let DesinfektionLocation = [
    {text:"Driver cabine",value:1},
    {text:"Patient cabine",value:2},
]

export let TaskTypes = [
    {text:"One way",value:1},
    {text:"Go & Return",value:2},
    {text:"Series mission",value:3}
]

export let TaskSenstive = [
    {text:"Material",value:1},
    {text:"Termin",value:2},
    {text:"Emergency",value:3}
]

export let Transportchein = [
    {text:"Go",value:1},
    {text:"Return",value:2},
    {text:"Office",value:3},
    {text:"Fax",value:4},
]

export let AddressSources = [
    {text:"Applicant address",value:1},
    {text:"Patient address",value:2},
]

export let WagonStatus = [
    {text:"Disabled",color:"#BDBDBD",value:0},
    {text:"onCall",color:"#00E676",value:1},
    {text:"InRide - Origin",color:"#C62828",value:2},
    {text:"InRide - Destination",color:"#EF6C00",value:3},
    {text:"Break",color:"#0277BD",value:4},
    {text:"Emergency",color:"#AD1457",value:5},
]

export let TuvStatus = [
    {text:"> 6",color:"#00E676",value:1},
    {text:"< 6 and > 3",color:"#EF6C00",value:2},
    {text:"< 3",color:"#C62828",value:3},
    
]

export let StaffStatus = [
    {text:"onCall",color:"#BDBDBD",value:1,theme:1},
    {text:"Vacation",color:"#0277BD",value:2,theme:2},
    {text:"Sick",color:"#EF6C00",value:3,theme:2},
    
]


export let Gender = [
    {text:"Man",value:1},
    {text:"Women",value:2},
    {text:"Other",value:3},
    
]