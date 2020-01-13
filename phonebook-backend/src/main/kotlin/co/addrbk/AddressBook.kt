package co.addrbk

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.runApplication

@SpringBootApplication
open class AddressBook
fun main(args: Array<String>) {
	runApplication<AddressBook>(*args)
}