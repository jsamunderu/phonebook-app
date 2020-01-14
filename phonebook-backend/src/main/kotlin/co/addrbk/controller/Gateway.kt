package co.addrbk.controller

import co.addrbk.model.Entry
import co.addrbk.crud.EntryRepository
import kotlin.collections.List
import kotlin.collections.mutableListOf
import kotlin.collections.MutableList
import java.io.IOException
import org.springframework.http.HttpStatus.*
import org.springframework.web.bind.annotation.*
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException

data class WireEntry(val name: String, val phoneNumber: String)
data class WireEntryUpdate(val oldPhoneNumber: String, val newName: String, val newPhoneNumber: String)
data class WireSearch(val name: String)
data class WireResponse(val status: Int, val message: String) 

@CrossOrigin(origins = ["http://localhost:3000"])
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
	fun search(@RequestBody fromWire: WireSearch) : MutableList<WireEntry> {
		println("search")
		var result = mutableListOf<WireEntry>()
		
		val entries = repository.findByName(fromWire.name) ?: listOf<Entry>()
		for (entry in entries) {
			result.add(WireEntry(entry.name, entry.phoneNumber))
		}
		return result
	}

	@PostMapping("/find")
	fun find(@RequestBody fromWire: WireSearch) : MutableList<WireEntry> {
		println("find")
		
		var result = mutableListOf<WireEntry>()

		val entry = repository.findByPhoneNumber(fromWire.name) ?: Entry("", "")
		val id: Long = entry.id ?: -1
		if (id != -1L) {
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
				println("SAVING"+ne.name+" "+ne.phoneNumber)
				val rec = Entry(ne.name, ne.phoneNumber);
				repository.save(rec)
				++count
			}
		} catch (e: Exception) {
			return  WireResponse(count, e.toString())
		}

		return WireResponse(count, "OK")
	}

	@PostMapping("/delete")
	fun delete(@RequestBody newEntries: List<WireEntry>) : WireResponse {
		println("delete")

		var count = 0
		try {
			for (ne in newEntries) {
				println("DELETING"+ne.name+" "+ne.phoneNumber)
				val entry = repository.findByPhoneNumber(ne.phoneNumber) ?: Entry("", "")
				val id: Long = entry.id ?: -1
				if (id != -1L) {
					repository.deleteById(id)
					++count
				}
			}
		} catch (e: Exception) {
			return  WireResponse(count, e.toString())
		}

		return WireResponse(count, "OK")
	}
	
	@PostMapping("/update")
	fun update(@RequestBody newEntries: List<WireEntryUpdate>) : WireResponse {
		println("update")

		var count = 0
		try {
			for (ne in newEntries) {
				println("UPDATING"+ne.oldPhoneNumber+" "+ne.newName+" "+ne.newPhoneNumber)
				val entry = repository.findByPhoneNumber(ne.oldPhoneNumber) ?: Entry("", "")
				if (entry.id != null) {
					entry.name = ne.newName
					entry.phoneNumber = ne.newPhoneNumber
					repository.save(entry)
					++count
				}
			}
		} catch (e: Exception) {
			return  WireResponse(count, e.toString())
		}

		return WireResponse(count, "OK")
	}
}
