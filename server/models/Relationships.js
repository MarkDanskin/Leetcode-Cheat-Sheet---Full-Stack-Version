import User from './User.js';
import Element from './element.js';
import Snippet from './Snippet.js';
import Category from './Category.js';
import ElementGroup from './ElementGroup.js';
import Log from './Log.js';

// Many-to-Many relationship between Element and Category
Element.belongsToMany(Category, { through: 'ElementCategory' });
Category.belongsToMany(Element, { through: 'ElementCategory' });

// One User has many Element Groups
User.hasMany(ElementGroup, { foreignKey: 'userId', onDelete: 'CASCADE' });
ElementGroup.belongsTo(User, { foreignKey: 'userId' });

// One User has many Elements
User.hasMany(Element, { foreignKey: 'userId', onDelete: 'CASCADE' });
Element.belongsTo(User, { foreignKey: 'userId' });

// One User has many Snippets
User.hasMany(Snippet, { foreignKey: 'userId', onDelete: 'CASCADE' });
Snippet.belongsTo(User, { foreignKey: 'userId' });

// One User has many Categories
User.hasMany(Category, { foreignKey: 'userId', onDelete: 'CASCADE' });
Category.belongsTo(User, { foreignKey: 'userId' });

// Many-to-Many relationship between Element and ElementGroup
Element.belongsToMany(ElementGroup, { through: 'ElementGroupElement', onDelete: 'CASCADE' });
ElementGroup.belongsToMany(Element, { through: 'ElementGroupElement', onDelete: 'CASCADE' });

// One Element has many Snippets
Element.hasMany(Snippet, { foreignKey: 'elementId', onDelete: 'CASCADE' });
Snippet.belongsTo(Element, { foreignKey: 'elementId' });

// One User has many Logs
User.hasMany(Log, { foreignKey: 'userId', onDelete: 'CASCADE' });
Log.belongsTo(User, { foreignKey: 'userId' });
