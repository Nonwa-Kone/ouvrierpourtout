import React from 'react'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'

interface PaginationProps {
  currentPage: number // Page actuelle
  totalPages: number // Nombre total de pages
  onPageChange: (page: number) => void // Fonction de rappel appelée lorsqu'une page est sélectionnée
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  // Générer les numéros de pages visibles
  const getPages = () => {
    const pages: number[] = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
      {/* Bouton précédent */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: currentPage === 1 ? '#007bff' : '#fff',
          color: currentPage === 1 ? '#fff' : '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <MdArrowBackIos />
      </button>

      {/* Numéros de page */}
      {getPages().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: page === currentPage ? '#007bff' : '#fff',
            color: page === currentPage ? '#fff' : '#000',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {page}
        </button>
      ))}

      {/* Bouton suivant */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next"
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: currentPage === totalPages ? '#007bff' : '#fff',
          color: currentPage === totalPages ? '#fff' : '#000',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <MdArrowForwardIos />
      </button>
    </div>
  )
}
