import * as React from 'react';
import {useContext, useReducer} from 'react';

type ContextProps = {
    page: string,
    point: {} | null,
    coordinates: any,
    points: PointsData[],
    originalPoints: PointsData[],
    setPage: (string: any) => void,
    setCoordinates: (coordinates: any) => void,
    setPoint: (point: {}) => void,
    setPoints: (points: []) => void,
    setOriginalPoints: (points: []) => void,
    setDataLoaded: (isDataLoaded: boolean) => void,

};
type PointsData = {
    id: number;
    status: string;
    description: string;
    coordinates: number[];
    urlImage: string;
    createdAt: string;// date
};
// const pointForFront = {
//     id: 1,
//     status: "great",
//     description: "Описане проблемы. все плохо спасите",
//     coordinates:  [60.444, 56.93333],
//     urlImage: "9rhqikxtsp.png",
//     createdAt: "22.09.2023",// date
// }
interface stateTownProvider {
    page: string,
    point: PointsData | null,
    coordinates: [],
    points: PointsData[] | [],
    originalPoints: PointsData[] | [],
    isDataLoaded: boolean,
}

interface reduceAction {
    type: string,
    payload: {} | PointsData[] | null
}

const TownContext = React.createContext<Partial<ContextProps>>({}); //передаем пустой обьект

enum ActionType {
    ADD_POINTS = "ADD_POINTS",
    CHANGE_PAGE = "CHANGE_PAGE",
    CHOOSE_POINT = "CHOOSE_POINT",
    FILTER_POINT = "FILTER_POINT",
    CHANGE_COORDINATES = "CHANGE_COORDINATES",
    GET_SERVER_STATUS = "GET_SERVER_STATUS"
};


const reducer = (state: stateTownProvider, action: reduceAction) => {
    switch (action.type) {
        case ActionType.ADD_POINTS:
            return Object.assign({}, state, {
                points: action.payload,
            });
        case ActionType.CHOOSE_POINT:
            console.log(action.payload)
            console.log(action.type)
            return Object.assign({}, state, {
                point: action.payload,
            });
        case ActionType.CHANGE_COORDINATES:
            return Object.assign({}, state, {
                coordinates: action.payload,
            });
        case ActionType.CHANGE_PAGE:
            return Object.assign({}, state, {
                page: action.payload,
            });
        default:
            return state;
    }
};

// @ts-ignore
const PointProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,
        { // первоначальный стайт
            page: "home",
            coordinates: [],
            isDataLoaded: false,
            point: null,
            points: [],
            originalPoints: [],
        });


    const setPoint = (payload: {}) => dispatch({type: ActionType.CHOOSE_POINT, payload});
    const setPoints = (payload: PointsData[]) => {
        dispatch({type: ActionType.ADD_POINTS, payload});
    };
    const setOriginalPoints = (payload: PointsData[]) => dispatch({type: ActionType.FILTER_POINT, payload});

    const setDataLoaded = (payload: boolean) => dispatch({type: ActionType.GET_SERVER_STATUS, payload});
    const setCoordinates = (payload: any) => dispatch({type: ActionType.CHANGE_COORDINATES, payload});
    const setPage = (payload: string) => dispatch({type: ActionType.CHANGE_PAGE, payload});

    return (
        <TownContext.Provider
            value={{
                page: state.page,
                coordinates: state.coordinates,
                point: state.point,
                points: state.points,
                originalPoints: state.originalPoints,
                setPage,
                setPoint,
                setPoints,
                setDataLoaded,
                setCoordinates,
                setOriginalPoints
            }}>
            {children}
        </TownContext.Provider>
    );
};


const useContextMap = () => {
    return useContext(TownContext);
};

export {
    PointProvider,
    useContextMap
};
