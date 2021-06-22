import './Filter.scss'

type FilterProps = {
  handleClick: () => void
}

const Filter: React.FC<FilterProps> = ({ handleClick, children }) => (
  <div className="filter">
    <button className="filter__button" onClick={handleClick}>
      {children}
    </button>
  </div>
)

export { Filter }
