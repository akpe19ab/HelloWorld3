import React from 'react'
import {View, Text, ImageBackground, Pressable} from 'react-native'
import styles from './styles'
import StylesButton from "../StylesButton"
import Home from "./Home"



const CarItem = (props) =>{

    const {name, tagline, image, taglineCta} = props;
    return (

        <View>
            <ImageBackground
                source={image}
                style={styles.image}
            />


            <View style={styles.titles}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{tagline}  <Text style={styles.subtitleCta}> {taglineCta}
                </Text></Text>

            </View>

            <View style={styles.buttonsContainer}>
              <StylesButton
                   type="secondary"
                   content={"Tilmeld dig som forældre!"}
                   onPress={()=>{
                       console.warn("Forældre tilmeldt")
                   }}
               />
<StylesButton
                    type="primary"
                    content={"Tilmeld dig som barn"}
                    onPress={()=>{
                        console.warn("Barn tilmeldt")
                    }}
                />
            </View>

        </View>

    );
};

export default CarItem;