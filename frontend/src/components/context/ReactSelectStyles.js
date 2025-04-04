const reactSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '20px',
        borderColor: state.isFocused ? '#74b9ff' : '#ced4da',
        boxShadow: state.isFocused ? '0 0 0 0.3px rgba(116, 185, 255, 0.3)' : 'none',
        fontFamily: 'Inter, sans-serif',
        fontSize: '1rem',
        fontStyle: 'oblique',
        fontWeight: '600',
        backgroundColor: '#fff',
        transition: 'all 0.3s ease-in-out',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#a27bf2' : state.isFocused ? '#e1edf3' : '#fff',
        color: state.isSelected ? 'white' : 'black',
        fontStyle: 'oblique',
        fontSize: '1rem',
        padding: '10px 15px',
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '20px',
        boxShadow: '0 0.8px 1.60px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#aaa',
        fontStyle: 'italic',
    }),
}

export default reactSelectStyles
