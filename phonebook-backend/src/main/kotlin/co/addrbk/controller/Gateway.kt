package co.addrbk.controller

import co.addrbk.model.Entry
import co.addrbk.crud.EntryRepository
import kotlin.collections.List
import kotlin.collections.mutableListOf
import kotlin.collections.MutableList
import java.io.IOException
import org.springframework.http.HttpStatus.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

data class WireEntry(val name: String, val phoneNumber: String)
data class WireSearch(val name: String)
data class WireResponse(val status: Int, val message: String) 

@RestController
@RequestMapping("/api/addrbk")
class Gateway(private val repository: EntryRepository) {

	@GetMapping
	fun getAll() : MutableList<WireEntry> {
		println("getAll")
		val entries = repository.findAll() ?: listOf<Entry>()
		var result = mutableListOf<WireEntry>()
		for (entry in entries) {
			result.add(WireEntry(entry.name, entry.phoneNumber))
		}
		return result
	}

	@PostMapping("/search")
	fun getName(@RequestBody fromWire: WireSearch) : MutableList<WireEntry> {
		println("getName")
		var result = mutableListOf<WireEntry>()
		
		val entries = repository.findByName(fromWire.name) ?: listOf<Entry>()
		for (entry in entries) {
			result.add(WireEntry(entry.name, entry.phoneNumber))
		}
		return result
	}
	
	@PostMapping("/")
	fun save(@RequestBody newEntries: List<WireEntry>) : WireResponse {
		println("save")
		var count = 0
		try {
			for (ne in newEntries) {
				val rec = Entry(ne.name, ne.phoneNumber);
				repository.save(rec)
				++count
			}
		} catch (e: Exception) {
			return  WireResponse(count, e.toString())
		}

		return WireResponse(count, "OK")
	}
}