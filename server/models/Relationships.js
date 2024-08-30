import User from './User';
import Element from './element';
import Snippet from './Snippet';
import Category from './Category';
import ElementGroup from './ElementGroup';
import Log from './Log';

// Many-to-Many relationship between Element and Category
Element.belongsToMany(Category, { through: 'ElementCategory' });
Category.belongsToMany(Element, { through: 'ElementCategory' });

// One User has many Element Groups
User.hasMany(ElementGroup, { foreignKey: 'userId', onDelete: 'CASCADE' });
ElementGroup.belongsTo(User, { foreignKey: 'userId' });

// Many-to-Many relationship between Element and ElementGroup
Element.belongsToMany(ElementGroup, { through: 'ElementGroupElement' });
ElementGroup.belongsToMany(Element, { through: 'ElementGroupElement' });

// One Element has many Snippets
Element.hasMany(Snippet, { foreignKey: 'elementId' });
Snippet.belongsTo(Element, { foreignKey: 'elementId' });

// One User has many Logs
User.hasMany(Log, { foreignKey: 'userId', onDelete: 'SET NULL' });
Log.belongsTo(User, { foreignKey: 'userId' });
