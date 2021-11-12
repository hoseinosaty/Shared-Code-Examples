// export let host = "http://192.168.1.8/api/";
export let host = "http://localhost:8091/api/";
//  export let host = "https://abadis.barayand.net/api/";


export let user = {
    public: host + "Employee",
    Auth: host+"endpoints/emp/authenticate",
    CpAuth: host+"endpoints/emp/ControlAuth",
    todayStatus: host + "Employee/shiftdetail",
    changeState: host + "Employee/ChangeStatus",
    deleteItem: host + "Employee/id?id=",
    loadStaffs: host + "Employee/staffs",
    loadStaffsByDateId: host + "WagenShift/dateid?dateid=",
    byWagontype: host + "WagenShift/GetDriverList",
};
export let Applicant = {
    getApplicants:host+"Applicant/GetApplicants",
    activeApplicants:host+"Applicant/ActiveApplicant",
}
export let shift = {
    public: host + "Shift",
    AddRange: host + "Shift/AddRange",
    loadShifts: host + "Shift/GetShiftList/",
    deleteItem: host + "Shift/id",
    update: host + "Shift"
};

export let car = {
    public: host + "Car",
    byTuv: host + "Car/GetListByTechnicalDiagnosis",
    driverAndStateByType: host + "Car/WagonDriverByType/",
    byType: host + "Car/type?type=",
    filteredWagonsList: host + "WagenShift/GetCars",
    deleteItem: host + "Car/id?id="
}

export let WagonShift = {
    public: host + "WagenShift",
    loadRange: host + "WagenShift/GetList",
    AddRange: host + "WagenShift/AddRange",
    loadShifts: host + "WagenShift/GetList?dateid=",
    deleteItem: host + "WagenShift/id?Id=",
}

export let TarrifTitle = {
    public: host + "TariffTitle",
    deleteItem: host + "TariffTitle/id?id="
}

export let Tarrif = {
    public: host + "Tariff",
    load: host + "Tariff/GetListAdmin/",
    deleteItem: host + "Tariff/id?id=",

}

export let Other = {
    transportType: host + "TransportType",
    deleteTransportType:host+"TransportType/id?id=",
    infektion: host + "InfectionType",
    deleteinfektion:host+"InfectionType/id?id="
}


export let Desinfektion = {
    public : host + "Desinfection",
    loadByType : host + "Desinfection/GetList/",
    deleteItem:host+"Desinfection/id?id="
}

export let TaskTitle = {
    public: host + "TaskTitle",
    deleteItem: host + "TaskTitle/id?id="
}

export let Task = {
    public: host + "Task",
    byId: host + "Task/GetById/",
    newId: host + "Task/NewTaskId",
    listByDate: host + "Task/GetListByDate/",
    deleteItem: host + "TaskTitle/id?id=",
    assignTask: host + "Task/Assign",
}

export let Role = {
    public: host + "Role",
    deleteItem: host + "Role/id?id=",
    setPerms: host + "Role/SetPerms"
}

export let Permission = {
    public: host + "Permission",
    tree : host + "Permission/Tree",
    deleteItem: host + "Permission/id?id="
}

export let Placename = {
    public: host + "Placename",
    deleteItem: host + "Placename/id?id="
}

export let Jobtitle = {
    public: host + "Jobtitle",
    deleteItem: host + "Jobtitle/id?id="
}