import fastdom from "fastdom"

export function allCriterionAndTests() {

	const toggleAttribute = (el) => (el === "true" || "" ? "false" : "true")

	const allCriterion = document.querySelector("#allCriterion")
	const allTests = document.querySelector("#allTests")


	const displayAllCriterion = (event) => {
		const containers = document.querySelectorAll(".criteres > div > section ")

		containers.forEach(container => {
			const button = container.children[0]
			const disabled = allTests?.getAttribute("disabled")
			if (disabled)
				allTests?.removeAttribute("disabled")
			else {
				allTests?.setAttribute("disabled", "true")
			}

			fastdom.mutate(() => {
				button.setAttribute("aria-expanded", event.target.checked)
			})

		})
	}

	function displayAllTests(event) {
		const containers = document.querySelectorAll(" .tests .methodologie")

		containers.forEach(container => {
			const button = container.children[0]
			fastdom.mutate(() => {
				button.setAttribute("aria-expanded", event.target.checked)
			})

		})

	}


	if (allCriterion) {
		allCriterion?.addEventListener("change", displayAllCriterion)
	}

	if (allTests && !allTests.getAttribute("disabled")) {
		allTests.addEventListener("change", displayAllTests)
	}
	/*
		document.addEventListener('DOMContentLoaded', function () {
			displayAllCriterion()
			displayAllTests()
		})*/
}

allCriterionAndTests()

export function init() {
	// Handle the 3 filters in criteria page
	const filtersEl = document.querySelector("#criteria-filters")
	const criteriaContainerEl = document.querySelector("#criteria-container")
	if (filtersEl && criteriaContainerEl) {
		const criteriaContainerParentEl = criteriaContainerEl.parentElement
		const buttonElms = criteriaContainerEl.getElementsByTagName("button")
		const liEls = criteriaContainerParentEl.querySelectorAll("li.criterion")

		// filtering happens under "criteria-filters" element
		filtersEl.addEventListener("change", function (e) {
			const curEl = e.target
			const filter = curEl.dataset.filter
			const checked = curEl.checked
			switch (filter) {
				case "all":
					const buttons = Array.from(buttonElms)
					for (let il = buttons.length, i = il - 1, button; i >= 0; --i) {
						button = buttons[i]
						fastdom.mutate(() => {
							button.setAttribute("aria-expanded", checked)
						})
					}
					break
				case "A":
				case "AA":
					let checkedFilters = Array.from(
						filtersEl.querySelectorAll("input:checked")
					)
					checkedFilters = checkedFilters.map((el) => el.dataset.filter)
					const lis = Array.from(liEls)
					lis.forEach(function (el) {
						const arr = el.dataset.wcagLevel.split(",")
						if (!arr.filter((el) => checkedFilters.includes(el)).length) {
							fastdom.mutate(() => {
								el.classList.add("fr-hidden")
							})
						} else {
							fastdom.mutate(() => {
								el.classList.remove("fr-hidden")
							})
						}
					})
					break
				default:
					// should never happen
					break
			}
		})
	}
}

init()
