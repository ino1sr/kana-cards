module Main exposing
    ( Model
    , Msg(..)
    , getNewKana
    , hiraganaList
    , init
    , main
    , subscriptions
    , update
    , view
    )

import Browser exposing (..)
import Html exposing (..)
import Html.Events exposing (onClick)



-- MODEL


type alias Model =
    { kana : String
    , kanaList : List String
    }


hiraganaList : List String
hiraganaList =
    [ "い", "う", "え", "お" ]


init : () -> ( Model, Cmd Msg )
init flags =
    ( Model "あ" hiraganaList, Cmd.none )



-- UPDATE


type Msg
    = Next


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Next ->
            let
                newKana =
                    getNewKana model
            in
            ( { model | kana = newKana, kanaList = List.drop 1 model.kanaList }, Cmd.none )


getNewKana : Model -> String
getNewKana model =
    model.kanaList
        |> List.take 1
        |> String.concat



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ div [] [ text model.kana ]
        , button [ onClick Next ] [ text "Next" ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }
