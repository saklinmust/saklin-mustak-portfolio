import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Project {
    name: string;
    description: string;
}
export interface Portfolio {
    title: string;
    projects: Array<Project>;
    owner: string;
}
export interface backendInterface {
    getAllProjects(): Promise<Array<Project>>;
    getPortfolio(): Promise<Portfolio>;
    getPortfolioMetadata(): Promise<{
        title: string;
        owner: string;
    }>;
}
