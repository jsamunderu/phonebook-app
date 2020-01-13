package co.addrbk.crud

import co.addrbk.model.Entry
import org.springframework.data.repository.CrudRepository

interface EntryRepository : CrudRepository<Entry, Long> {
	fun findByPhoneNumber(phoneNumber: String): Entry?
	fun findByName(name: String): Iterable<Entry>?
}