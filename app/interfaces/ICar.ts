import { BodyShap } from "../Enums/BodyShap";
import { Transimission } from "../Enums/Transmission";
import { ICarBrand } from "./ICarBrand";
import { ICarModel } from "./ICarModel";
import { ILocaltion } from "./ILocation";

export interface ICar
{
    id:number,
    brandName:string,
    modelName:string,
    year:number,
    transmission:Transimission,
    bodyShap:BodyShap,
    EngineCapacity:number,
    mileAge:number,  // in km 
    price:number,
    address:string,
    discription:string,
    userId:number,
    poster:string
}