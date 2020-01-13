package co.addrbk.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Entry(
		var name: String,
		var phoneNumber: String,
		var entryTime: LocalDateTime = LocalDateTime.now(),
		var modifiedTime: LocalDateTime = LocalDateTime.now(),
		@Id @GeneratedValue var id: Long? = null)