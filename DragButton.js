import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
    useSharedValue,
    withSpring,
    useAnimatedStyle,
    useAnimatedGestureHandler,
} from 'react-native-reanimated'

import { PanGestureHandler } from 'react-native-gesture-handler'

const DragButton = () => {
    /*
     * useSharedValue is hook keep animation state
     * Shared means that the value is accessible across UI and JS threads
     * in this case is to store the initial position of the square
     * we can change by accessing e.g. x.value
     */
    const translation = {
        x: useSharedValue(0),
        y: useSharedValue(0),
    }

    /*
     * The hook useAnimatedGestureHandler to handle Gesture Handlers
     * The hook accepts an object where we can configure events
     * onStart, onActive, onEnd, onCancel, onFail, onFinish
     * Each event has access to 2 parameters
     * event : an object that consists of information like translate, velocity, current position, etc... (dependent on Gesture Handler we use)
     * context : a plain JS object to store data between events. We can keep in context any information we want.
     * In return from hook, we get an object, which needs to be passed to Gesture Handler (onGestureEvent).
     */
    const onPanGestureEvent = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startX = translation.x.value
            ctx.startY = translation.y.value
        },
        onActive: (event, ctx) => {
            translation.x.value = ctx.startX + event.translationX
            translation.y.value = ctx.startY + event.translationY
        },
        onEnd: (_) => {
            translation.x.value = withSpring(0)
            translation.y.value = withSpring(0)
        },
    })

    /**
     * in this hook we define style properties we want to be animated
     * in our case we want to animate the position of the cube
     */

    const animationStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translation.x.value,
                },
                {
                    translateY: translation.y.value,
                },
            ],
        }
    })

    return (
        <PanGestureHandler onGestureEvent={onPanGestureEvent}>
            <Animated.View style={[styles.square, animationStyle]} />
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    square: {
        width: 75,
        height: 75,
        backgroundColor: '#4da19b',
        borderRadius: 25,
    },
})

export default DragButton
