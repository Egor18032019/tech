import * as React from 'react';
import {useContext, useReducer} from 'react';

type ContextProps = {
    point: {} | null,
    points: PointsData[],
    originalPoints: [],
    setPoint: (point: {}) => void,
    setPoints: (points: []) => void,
    setOriginalPoints: (points: []) => void,
    setDataLoaded: (isDataLoaded: boolean) => void,

};
//todo добавить imageUrl
type PointsData = {
    id: number;
    status: string;
    description: string;
    coordinates: number[];
    urlImage: string;
    createdAt: string;// date
};
const pointForFront = {
    id: 1,
    status: "great",
    description: "Описане проблемы. все плохо спасите",
    coordinates:  [60.444, 56.93333],
    urlImage: "9rhqikxtsp.png",
    createdAt: "22.09.2023",// date
}
interface stateTownProvider {
    page: string,
    isDataLoaded: boolean,
    point: PointsData | null,
    points: PointsData[] | [],
    originalPoints: [],
}

interface reduceAction {
    type: string,
    payload: {} | PointsData[] | null
}

const TownContext = React.createContext<Partial<ContextProps>>({}); //передаем пустой обьект

enum ActionType {
    ADD_POINTS = "ADD_POINTS",
    CHOOSE_POINT = "CHOOSE_POINT",
    FILTER_POINT = "FILTER_POINT",
    GET_SERVER_STATUS = "GET_SERVER_STATUS"
};


const reducer = (state: stateTownProvider, action: reduceAction) => {
    console.log("state" + state)
    switch (action.type) {
        case ActionType.ADD_POINTS:
            return Object.assign({}, state, {
                points: action.payload,
            });
        case ActionType.CHOOSE_POINT:
            return Object.assign({}, state, {
                point: action.payload,
            });
        default:
            return state;
    }
};

// @ts-ignore
const TownProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,
        { // первоначальный стайт
            page: "first",
            isDataLoaded: false,
            point: pointForFront,
            points: [],
            originalPoints: [],
        });


    const setPoint = (payload: {}) => dispatch({type: ActionType.CHOOSE_POINT, payload});
    const setPoints = (payload: PointsData[]) => {


        dispatch({type: ActionType.ADD_POINTS, payload});
    };
    const setOriginalPoints = (payload: PointsData[]) => dispatch({type: ActionType.FILTER_POINT, payload});

    const setDataLoaded = (payload: boolean) => dispatch({type: ActionType.GET_SERVER_STATUS, payload});

    return (
        <TownContext.Provider
            value={{
                point: state.point,
                points: state.points,
                originalPoints: state.originalPoints,
                setPoint,
                setPoints,
                setDataLoaded,
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
    TownProvider,
    useContextMap
};
