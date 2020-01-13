package co.addrbk.crud

import co.addrbk.model.Entry
import co.addrbk.crud.EntryRepository

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager
import org.springframework.data.repository.findByIdOrNull

@DataJpaTest
class EntryRepositoryTests @Autowired constructor(
		val entityManager: TestEntityManager,
		val repository: EntryRepository) {

	@Test
	fun `When findByIdOrNull then return Article`() {
		val entry = Entry("John", "1234567")
		entityManager.persist(entry)
		entityManager.flush()
		val found = repository.findByPhoneNumber(entry.phoneNumber!!)
		assertThat(found).isNotEqualTo(null)
	}
}
