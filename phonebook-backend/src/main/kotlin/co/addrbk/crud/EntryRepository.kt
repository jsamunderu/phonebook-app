package co.addrbk.crud

import co.addrbk.model.Entry
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface EntryRepository : CrudRepository<Entry, Long> {
	fun findByPhoneNumber(phoneNumber: String): Entry?
	@Query("SELECT e FROM Entry e WHERE e.name LIKE CONCAT('%',:name,'%')")
	fun findByName(name: String): Iterable<Entry>?
}