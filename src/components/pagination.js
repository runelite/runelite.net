import { h } from 'preact'
import { range } from '../util'

const LEFT_PAGE = 'LEFT'
const RIGHT_PAGE = 'RIGHT'

// Code from https://www.digitalocean.com/community/tutorials/how-to-build-custom-pagination-with-react
function getPageNumbers(currentPage, totalPages, pageNeighbours) {
  /**
   * totalNumbers: the total page numbers to show on the control
   * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
   */
  const totalNumbers = pageNeighbours * 2 + 3
  const totalBlocks = totalNumbers + 2

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours)
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours)
    let pages = range(startPage, endPage)

    /**
     * hasLeftSpill: has hidden pages to the left
     * hasRightSpill: has hidden pages to the right
     * spillOffset: number of hidden pages either to the left or to the right
     */
    const hasLeftSpill = startPage > 2
    const hasRightSpill = totalPages - endPage > 1
    const spillOffset = totalNumbers - (pages.length + 1)

    switch (true) {
      // handle: (1) < {5 6} [7] {8 9} (10)
      case hasLeftSpill && !hasRightSpill: {
        const extraPages = range(startPage - spillOffset, startPage - 1)
        pages = [LEFT_PAGE, ...extraPages, ...pages]
        break
      }

      // handle: (1) {2 3} [4] {5 6} > (10)
      case !hasLeftSpill && hasRightSpill: {
        const extraPages = range(endPage + 1, endPage + spillOffset)
        pages = [...pages, ...extraPages, RIGHT_PAGE]
        break
      }

      // handle: (1) < {4 5} [6] {7 8} > (10)
      case hasLeftSpill && hasRightSpill:
      default: {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE]
        break
      }
    }

    return [1, ...pages, totalPages]
  }

  return range(1, totalPages)
}

function createPage(page, index, currentPage, onClick) {
  if (page === LEFT_PAGE)
    return (
      <li key={index} class="page-item">
        <button
          class="page-link"
          aria-label="Previous"
          onClick={() => onClick(currentPage - 1)}
        >
          <i aria-hidden="true" class="fas fa-angle-double-left" />
          <span class="sr-only">Previous</span>
        </button>
      </li>
    )

  if (page === RIGHT_PAGE)
    return (
      <li key={index} class="page-item">
        <button
          class="page-link"
          aria-label="Next"
          onClick={() => onClick(currentPage + 1)}
        >
          <i aria-hidden="true" class="fas fa-angle-double-right" />
          <span class="sr-only">Next</span>
        </button>
      </li>
    )

  return (
    <li key={index} class={`page-item${currentPage === page ? ' active' : ''}`}>
      <button class="page-link" onClick={() => onClick(page)}>
        {page}
      </button>
    </li>
  )
}

const Pagination = ({ currentPage, totalPages, pageNeighbours, onClick }) => {
  if (totalPages <= 1) {
    return <noscript />
  }

  const pages = getPageNumbers(currentPage, totalPages, pageNeighbours)

  return (
    <div class="d-flex justify-content-center mt-3">
      <ul class="pagination flex-sm-wrap">
        {pages.map((page, index) =>
          createPage(page, index, currentPage, onClick)
        )}
      </ul>
    </div>
  )
}

export default Pagination
