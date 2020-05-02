package index

import reactModules.App
import react.RClass
import react.RProps
import react.dom.*
import kotlin.browser.*

fun main() {
    render(document.getElementById("root")) {
        App {}
    }
}
